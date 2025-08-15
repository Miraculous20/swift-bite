import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
import EateryModel from '../models/eatery.model.js';

const authEateryMiddleware = async (req, res, next) => {
  try {
    // Eatery admins will use the standard 'accessToken' cookie, same as regular users.
    const token = req.cookies?.accessToken || req.headers?.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Eatery admin authentication required.",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    
    // Find the user and ensure they are an ADMIN
    const user = await UserModel.findById(decoded.id);
    if (!user || user.role !== 'ADMIN') {
        return res.status(403).json({ success: false, message: "Access denied. Admin role required." });
    }

    // Find the eatery associated with this admin user
    const eatery = await EateryModel.findOne({ adminUserId: user._id });
    if (!eatery) {
        return res.status(403).json({ success: false, message: "Access denied. No eatery associated with this admin." });
    }

    // Attach the admin user and their eatery to the request for easy access in controllers
    req.user = user;
    req.eatery = eatery;
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token for eatery admin.",
    });
  }
};

export default authEateryMiddleware;