import { Router } from 'express';
import {
    registerUserController,
    loginUserController,
    logoutUserController,
    userDetailsController,
    updateUserDetailsController,
    uploadAvatarController,
    verifyEmailController,
    forgotPasswordController,
    verifyForgotPasswordOtpController,
    resetPasswordController,
    refreshTokenController
} from '../controllers/user.controller.js';
import authMiddleware from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const userRouter = Router();

// --- Public Routes ---
userRouter.post('/register', registerUserController);
userRouter.post('/login', loginUserController);
userRouter.post('/refresh-token', refreshTokenController);
userRouter.post('/verify-email', verifyEmailController);
userRouter.post('/forgot-password', forgotPasswordController);
userRouter.post('/verify-otp', verifyForgotPasswordOtpController);
userRouter.put('/reset-password', resetPasswordController);

// --- Protected Routes (require auth) ---
userRouter.get('/logout', authMiddleware, logoutUserController);
userRouter.get('/details', authMiddleware, userDetailsController);
userRouter.put('/details', authMiddleware, updateUserDetailsController);
userRouter.put('/avatar', authMiddleware, upload.single('avatar'), uploadAvatarController);

export default userRouter;