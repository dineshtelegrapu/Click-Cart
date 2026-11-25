const express = require("express");

const {
    signup,
    login,
    getProfile,
    updateSettings
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes
router.get("/me", authMiddleware, getProfile);
router.put("/settings", authMiddleware, updateSettings);

module.exports = router;