# 🛒 Click-Cart — Full-Stack E-Commerce Website

Click-Cart is a **full-stack e-commerce web application** designed to demonstrate practical skills in **frontend development, backend development, REST API design, database management, authentication, and full-stack application architecture**.

Users can browse and search products, manage their cart and wishlist, place orders, and manage their accounts. Administrators can manage products, customers, and orders through the backend.

---

## 🚀 Features

### 👤 User Features

* User registration and login
* JWT-based user authentication
* Secure password hashing using bcrypt
* Browse products
* Search products
* Product categories
* Product details
* Add products to cart
* Update cart quantities
* Remove products from cart
* Add/remove products from wishlist
* Checkout
* Order history
* User profile
* Account settings
* Responsive user interface

### 🔐 Admin Features

* Add new products
* Update product information
* Delete products
* Manage customer orders
* View customer information
* Product management
* Order management
* Admin dashboard

---

## 🏗️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* React.js

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* MongoDB
* Mongoose

### Authentication & Security

* JSON Web Token (JWT)
* bcrypt password hashing
* Authentication middleware
* Protected routes

### Development Tools

* VS Code
* Git
* GitHub
* npm

---

## 📁 Project Structure

```text
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
```

---

## 🔄 Application Architecture

The application follows a client-server architecture:

```text
                   ┌────────────────────┐
                   │      Frontend      │
                   │ HTML/CSS/JS/React  │
                   └─────────┬──────────┘
                             │
                             │ HTTP Requests
                             ▼
                   ┌────────────────────┐
                   │   Express Server   │
                   │     Node.js        │
                   └─────────┬──────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
                    ▼                 ▼
              ┌───────────┐    ┌──────────────┐
              │Middleware │    │ Controllers  │
              │JWT Auth   │    │ Business     │
              │           │    │ Logic        │
              └───────────┘    └──────┬───────┘
                                      │
                                      ▼
                               ┌─────────────┐
                               │  Mongoose   │
                               │   Models    │
                               └──────┬──────┘
                                      │
                                      ▼
                               ┌─────────────┐
                               │   MongoDB   │
                               │  Database   │
                               └─────────────┘
```

---

## 🔐 Authentication Flow

Click-Cart uses **JWT authentication** to protect user-specific resources.

```text
User
 │
 ▼
Login / Register
 │
 ▼
Backend Authentication
 │
 ├── Validate credentials
 │
 ├── Hash/verify password using bcrypt
 │
 ▼
Generate JWT
 │
 ▼
Client stores authentication token
 │
 ▼
Protected API Request
 │
 ▼
Authentication Middleware
 │
 ├── Verify JWT
 │
 └── Identify User
 │
 ▼
Controller
 │
 ▼
Database
```

---

## 🔌 Backend API Modules

The backend is organized into separate route and controller modules.

### Authentication

```text
/auth
```

Handles:

* User registration
* User login
* Authentication
* User account operations

### Products

```text
/products
```

Handles:

* Fetch products
* Product details
* Add products
* Update products
* Delete products
* Product search/categories

### Cart

```text
/cart
```

Handles:

* Add item to cart
* Update quantity
* Remove item
* Retrieve cart

### Wishlist

```text
/wishlist
```

Handles:

* Add product to wishlist
* Remove product
* Retrieve wishlist

### Orders

```text
/orders
```

Handles:

* Create orders
* Retrieve order history
* Manage orders
* Update order status

---

## 🗄️ Database Models

The application uses MongoDB with Mongoose for data modeling.

### User

Stores:

* User information
* Authentication credentials
* Account details
* User role

### Product

Stores:

* Product name
* Description
* Price
* Category
* Product image
* Stock information

### Order

Stores:

* Customer information
* Ordered products
* Quantity
* Total amount
* Order status
* Order date

### Wishlist

Stores:

* User reference
* Product references

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Click-Cart.git
```

Navigate into the project:

```bash
cd Click-Cart
```

---

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> Never upload your `.env` file or secret keys to GitHub.

---

### 4. Start the Backend Server

For development:

```bash
npm run dev
```

Or:

```bash
node server.js
```

The backend server will run on:

```text
http://localhost:5000
```

---

### 5. Run the Frontend

Open the `frontend` folder in VS Code and launch the application using **Live Server** or your preferred frontend development server.

---

## 🧪 Testing

Before deployment, test the major application flows:

* User registration
* User login
* JWT authentication
* Product browsing
* Product search
* Cart operations
* Wishlist operations
* Checkout
* Order history
* Profile management
* Admin product management
* Admin order management

---

## 🛡️ Security

The application implements several security practices:

* JWT-based authentication
* Password hashing using bcrypt
* Protected API routes
* Authentication middleware
* Environment variables for sensitive configuration
* Role-based access for administrative functionality

---

## 📱 Responsive Design

Click-Cart is designed to provide a responsive experience across:

* Desktop
* Laptop
* Tablet
* Mobile devices

---

## 🔮 Future Improvements

Planned improvements include:

* Online payment integration
* Product reviews and ratings
* Advanced product filtering
* Pagination
* Product recommendations
* Email notifications
* Admin analytics dashboard
* Image upload system
* Order tracking
* Refresh-token authentication
* API rate limiting
* Automated testing
* Docker containerization
* Cloud deployment
* CI/CD pipeline

---

## 🎯 Project Goals

Click-Cart was developed to gain practical experience with:

* Full-stack web development
* REST API development
* Client-server architecture
* Authentication and authorization
* Database design
* CRUD operations
* Middleware
* API integration
* Git and GitHub
* Scalable project organization

---

## 📚 What I Learned

Through this project, I gained hands-on experience in building a complete web application from frontend to backend.

Key areas include:

* Designing responsive user interfaces
* Connecting frontend applications with backend APIs
* Building RESTful APIs using Express.js
* Working with MongoDB and Mongoose
* Implementing JWT authentication
* Securing passwords with bcrypt
* Creating protected routes using middleware
* Managing application data
* Structuring a full-stack project

---

## 👨‍💻 Author

**Your Name**

Built as a full-stack web development project to demonstrate practical software engineering skills.

---

## ⭐ Support

If you found this project useful, consider giving the repository a ⭐ on GitHub.

```
```
