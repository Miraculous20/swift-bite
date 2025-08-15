// This is a higher-order function that returns the actual middleware
export const checkRole = (requiredRole) => {
  return (req, res, next) => {
    // The 'authMiddleware' should have already run and attached the user object to req.user
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication error. User details not found.",
      });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({ // 403 Forbidden is more appropriate
        success: false,
        message: `Access denied. You do not have the required '${requiredRole}' permissions.`,
      });
    }

    // If the role matches, proceed to the next middleware or controller
    next();
  };
};