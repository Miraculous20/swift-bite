
export const checkRole = (requiredRole) => {
  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication error. User details not found.",
      });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({ 
        success: false,
        message: `Access denied. You do not have the required '${requiredRole}' permissions.`,
      });
    }

    next();
  };
};