const Product = require("../models/Product");

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            message: "Products fetched successfully",
            products
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// GET SINGLE PRODUCT
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            product
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// CREATE PRODUCT
const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            image,
            category,
            stock
        } = req.body;

        // Check required fields
        if (
            !name ||
            !description ||
            price === undefined ||
            !image ||
            !category ||
            stock === undefined
        ) {
            return res.status(400).json({
                message: "Please provide all product details"
            });
        }

        // Create product
        const product = await Product.create({
            name,
            description,
            price,
            image,
            category,
            stock
        });

        res.status(201).json({
            message: "Product created successfully",
            product
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(
            req.params.id
        );
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.status(200).json({
            message: "Product deleted successfully"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};