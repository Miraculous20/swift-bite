import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false 
    },
    avatar: {
        type: String,
        default: ""
    },
    mobile: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum: ['ADMIN', "USER"], 
        default: "USER"
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    verificationTokenExpires: Date,
    refresh_token: String,
    forgot_password_otp: String,
    forgot_password_expiry: Date,
}, {
    timestamps: true
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;