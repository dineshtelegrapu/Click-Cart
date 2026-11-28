const express = require("express");

const {
    createOrder,
    getMyOrders
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get logged-in user's orders
router.get("/", authMiddleware, getMyOrders);

// Place a new order
router.post("/", authMiddleware, createOrder);

module.exports = router;