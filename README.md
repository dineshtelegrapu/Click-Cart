Click-Cart - E-Commerce Website
Click-Cart is a full-stack e-commerce web application that allows users to browse products, search for products, add items to their cart and wishlist, place orders, and manage their accounts.
The project is built to demonstrate practical frontend and backend development skills.
Features
User Features
User Registration and Login
User Authentication
Browse Products
Search Products
Product Categories
Product Details
Add to Cart
Update Cart Quantity
Remove Items from Cart
Wishlist
Checkout
Order History
User Profile
Account Settings
Responsive Design
Admin Features
Add New Products
Update Product Information
Delete Products
Manage Orders
View Customer Details
Product Management Dashboard
Technologies Used
Frontend
HTML
CSS
JavaScript
React.js
Backend
Node.js
Express.js
Database
MongoDB
Mongoose
Authentication
JWT (JSON Web Token)
bcrypt Password Hashing

Project Structure -

Click-Cart/
│
├── frontend/
│   ├── index.html
│   ├── products.html
│   ├── cart.html
│   ├── login.html
│   ├── signup.html
│   ├── profile.html
│   ├── settings.html
│   ├── orders.html
│   ├── wishlist.html
│   │
│   ├── css/
│   │   ├── style.css
│   │   └── login.css
│   │
│   └── js/
│       ├── auth.js
│       ├── profile.js
│       ├── products.js
│       ├── cart.js
│       ├── wishlist.js
│       ├── orders.js
│       └── settings.js
│
├── backend/
│   ├── server.js
│   ├── package.json
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── wishlistRoutes.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   └── wishlistController.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Wishlist.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   └── config/
│       └── database.js
│
└── README.md