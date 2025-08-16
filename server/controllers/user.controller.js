import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import sendEmail from '../config/sendEmail.js';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js';
import generatedAccessToken from '../utils/generatedAccessToken.js';
import generatedRefreshToken from '../utils/generatedRefreshToken.js';
import generatedOtp from '../utils/generatedOtp.js';
import uploadImageClodinary from '../utils/uploadImageClodinary.js';

export const registerUserController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "An account with this email already exists." });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const verificationToken = crypto.randomBytes(32).toString('hex');

        const newUser = new UserModel({
            name, email, password: hashedPassword,
            verificationToken,
            verificationTokenExpires: Date.now() + 3600000, // 1 hour
        });
        await newUser.save();
        
        const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
        await sendEmail({
            sendTo: email,
            subject: "Verify Your Swift-Bite Account",
            html: verifyEmailTemplate({ name, url: verifyUrl }),
        });

        res.status(201).json({ success: true, message: "User registered. Please check your email to verify your account." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error during registration.", error: error.message });
    }
};

export const verifyEmailController = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
           return res.status(400).json({ success: false, message: "Verification token is required." });
        }
        const user = await UserModel.findOne({
            verificationToken: token,
            verificationTokenExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification token." });
        }

        user.verify_email = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;
        await user.save();

        res.status(200).json({ success: true, message: "Email verified successfully. You can now log in." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error during email verification." });
    }
};

export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required." });
        }

        const user = await UserModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }
        if (!user.verify_email) {
            return res.status(403).json({ success: false, message: "Please verify your email before logging in." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }

        const accessToken = generatedAccessToken(user._id);
        const refreshToken = generatedRefreshToken(user._id);
        user.refresh_token = refreshToken;
        await user.save();

        const cookieOptions = { httpOnly: true, secure: true, sameSite: 'None' };
        res.cookie('accessToken', accessToken, cookieOptions);
        res.cookie('refreshToken', refreshToken, cookieOptions);

        user.password = undefined;
        res.status(200).json({ success: true, message: "Login successful.", data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error during login." });
    }
};

export const logoutUserController = async (req, res) => {
    try {
        await UserModel.findByIdAndUpdate(req.user._id, { refresh_token: "" });
        const cookieOptions = { httpOnly: true, secure: true,  sameSite: 'None' };
        res.clearCookie("accessToken", cookieOptions);
        res.clearCookie("refreshToken", cookieOptions);
        return res.status(200).json({ success: true, message: "Logout successful." });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error during logout." });
    }
};

export const userDetailsController = async (req, res) => {
    try {
        return res.status(200).json({ success: true, message: "User details retrieved.", data: req.user });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error." });
    }
};

export const updateUserDetailsController = async (req, res) => {
    try {
        const { name, mobile } = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(req.user._id, { name, mobile }, { new: true, runValidators: true }).select('-password');
        return res.status(200).json({ success: true, message: "Profile updated successfully.", data: updatedUser });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to update profile." });
    }
};

export const uploadAvatarController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded." });
        }
        const result = await uploadImageClodinary(req.file.buffer, "swiftbite_avatars");
        const updatedUser = await UserModel.findByIdAndUpdate(req.user._id, { avatar: result.secure_url }, { new: true }).select('-password');
        res.status(200).json({ success: true, message: "Avatar updated successfully.", data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error during file upload." });
    }
};

export const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(200).json({ success: true, message: "If an account with that email exists, a password reset OTP has been sent." });
        }
        const otp = generatedOtp();
        user.forgot_password_otp = otp;
        user.forgot_password_expiry = Date.now() + 600000; // 10 minutes
        await user.save();

        await sendEmail({
            sendTo: email,
            subject: "Your Swift-Bite Password Reset Code",
            html: forgotPasswordTemplate({ name: user.name, otp }),
        });

        res.status(200).json({ success: true, message: "If an account with that email exists, an OTP has been sent." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." });
    }
};

export const verifyForgotPasswordOtpController = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ success: false, message: "Email and OTP are required." });
        }
        const user = await UserModel.findOne({ email, forgot_password_otp: otp, forgot_password_expiry: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
        }
        res.status(200).json({ success: true, message: "OTP verified successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." });
    }
};

export const resetPasswordController = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ success: false, message: "Email, OTP, and new password are required." });
        }
        const user = await UserModel.findOne({ email, forgot_password_otp: otp, forgot_password_expiry: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
        }
        user.password = await bcrypt.hash(newPassword, 12);
        user.forgot_password_otp = undefined;
        user.forgot_password_expiry = undefined;
        await user.save();
        
        res.status(200).json({ success: true, message: "Password has been reset successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." });
    }
};

export const refreshTokenController = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(401).json({ success: false, message: "Refresh token not found." });

        const decoded = jwt.verify(token, process.env.SECRET_KEY_REFRESH_TOKEN);
        const user = await UserModel.findById(decoded.id);

        if (!user || user.refresh_token !== token) {
            return res.status(403).json({ success: false, message: "Invalid refresh token." });
        }
        
        const accessToken = generatedAccessToken(user._id);
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'None' });
        
        res.status(200).json({ success: true, message: "Token refreshed." });
    } catch (error) {
        res.status(403).json({ success: false, message: "Invalid or expired refresh token." });
    }
};