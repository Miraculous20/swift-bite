import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.headers?.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. No token provided.",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    
    // Find the user but exclude the password field
    const user = await UserModel.findById(decoded.id).select('-password');

    if (!user) {
        return res.status(401).json({ success: false, message: "User not found." });
    }

    // Attach the full user object to the request for later use
    req.user = user;
    
    next();
  } catch (error) {
    let message = "Authentication failed.";
    if (error.name === 'TokenExpiredError') {
      message = "Access token has expired. Please log in again.";
    } else if (error.name === 'JsonWebTokenError') {
      message = "Invalid access token.";
    }
    
    return res.status(401).json({
      success: false,
      message,
    });
  }
};

export default authMiddleware;