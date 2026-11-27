const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
    try {
        // Get authenticated user from database
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check admin role
        if (user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admin privileges required."
            });
        }

        // Allow admin to continue
        next();

    } catch (error) {
        console.error("Admin authorization error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = adminMiddleware;