const Order = require("../models/Order");
const Product = require("../models/product");
const mongoose = require("mongoose");

// CREATE ORDER
const createOrder = async (req, res) => {
    try {
        const {
            products,
            customer,
            paymentMethod
        } = req.body;

        // Validate products
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                message: "Your cart is empty"
            });
        }

        // Validate customer details
        const requiredFields = [
            "name",
            "phone",
            "address",
            "city",
            "state",
            "pincode"
        ];

        if (
            !customer ||
            requiredFields.some(field =>
                typeof customer[field] !== "string" ||
                !customer[field].trim()
            )
        ) {
            return res.status(400).json({
                message: "Please provide complete delivery information"
            });
        }

        // Validate payment method
        if (!["cod", "card", "upi"].includes(paymentMethod)) {
            return res.status(400).json({
                message: "Invalid payment method"
            });
        }

        // Validate and combine duplicate product IDs
        const quantities = new Map();

        for (const item of products) {
            if (
                !item.productId ||
                !mongoose.isValidObjectId(item.productId) ||
                !Number.isInteger(item.quantity) ||
                item.quantity < 1 ||
                item.quantity > 10
            ) {
                return res.status(400).json({
                    message: "Invalid product or quantity"
                });
            }

            const id = item.productId.toString();
            const newQuantity =
                (quantities.get(id) || 0) + item.quantity;

            if (newQuantity > 10) {
                return res.status(400).json({
                    message: "Maximum quantity per product is 10"
                });
            }

            quantities.set(id, newQuantity);
        }

        // Fetch actual products from MongoDB
        const productIds = [...quantities.keys()];

        const databaseProducts = await Product.find({
            _id: { $in: productIds }
        });

        if (databaseProducts.length !== productIds.length) {
            return res.status(400).json({
                message: "One or more products are unavailable"
            });
        }

        let total = 0;
        const orderProducts = [];

        // Verify stock and calculate total
        for (const product of databaseProducts) {
            const quantity = quantities.get(
                product._id.toString()
            );

            if (product.stock < quantity) {
                return res.status(400).json({
                    message: `${product.name} has insufficient stock`
                });
            }

            total += product.price * quantity;

            orderProducts.push({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity
            });
        }

        // Save order and update stock atomically
        const session = await mongoose.startSession();

        try {
            let createdOrder;

            await session.withTransaction(async () => {

                // Conditionally reduce stock
                for (const item of orderProducts) {
                    const result = await Product.updateOne(
                        {
                            _id: item.product,
                            stock: { $gte: item.quantity }
                        },
                        {
                            $inc: { stock: -item.quantity }
                        },
                        { session }
                    );

                    if (result.modifiedCount !== 1) {
                        throw new Error(
                            `Insufficient stock for ${item.name}`
                        );
                    }
                }

                const [order] = await Order.create(
                    [{
                        user: req.user.userId,
                        products: orderProducts,
                        customer: {
                            name: customer.name.trim(),
                            phone: customer.phone.trim(),
                            address: customer.address.trim(),
                            city: customer.city.trim(),
                            state: customer.state.trim(),
                            pincode: customer.pincode.trim()
                        },
                        paymentMethod,
                        total,
                        status: "Placed"
                    }],
                    { session }
                );

                createdOrder = order;
            });

            return res.status(201).json({
                message: "Order placed successfully",
                order: createdOrder
            });

        } finally {
            await session.endSession();
        }

    } catch (error) {
        console.error("Create order error:", error);

        res.status(500).json({
            message: "Unable to place order. Please try again."
        });
    }
};

// GET LOGGED-IN USER'S ORDERS
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.userId
        }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Orders fetched successfully",
            orders
        });

    } catch (error) {
        console.error("Get orders error:", error);

        res.status(500).json({
            message: "Unable to fetch orders"
        });
    }
};

module.exports = {
    createOrder,
    getMyOrders
};