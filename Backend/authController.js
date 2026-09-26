// controllers/authController.js

// Signup controller
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide name, email and password"
            });
        }

        // Temporary response
        res.status(201).json({
            message: "Signup request received",
            user: {
                name,
                email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};


// Login controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        // Temporary response
        res.status(200).json({
            message: "Login request received",
            email
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    signup,
    login
};
