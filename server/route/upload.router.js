import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import uploadImageController from '../controllers/uploadImage.controller.js';
import upload from '../middleware/multer.js';

const uploadRouter = Router();

// Image upload requires a logged-in user
uploadRouter.post("/", authMiddleware, upload.single("image"), uploadImageController);

export default uploadRouter;