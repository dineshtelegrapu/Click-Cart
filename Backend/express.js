const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Clik-Cart Backend is running!");
});

// Test API
app.get("/api/test", (req, res) => {
    res.json({
        message: "Express API is working!"
    });
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
