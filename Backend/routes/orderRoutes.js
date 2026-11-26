const express = require("express");

const {
    createOrder
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protected order routes
router.post("/", authMiddleware, createOrder);

module.exports = router;