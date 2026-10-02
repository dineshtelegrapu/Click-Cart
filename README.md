# 🛒 Click-Cart — Full-Stack E-Commerce Website

Click-Cart is a full-stack e-commerce project I built to practice frontend and backend development. Users can browse products, manage their cart and wishlist, place orders, and manage their accounts.

## 🚀 Features

### User
- Register and login
- JWT authentication
- Secure password hashing with bcrypt
- Browse and search products
- Product categories and details
- Cart and wishlist
- Checkout and order history
- Profile and account settings
- Responsive UI

### Admin
- Add, update, and delete products
- Manage orders
- View customer information
- Product and order management

## 🛠️ Tech Stack

**Frontend:** HTML, CSS, JavaScript, React.js  
**Backend:** Node.js, Express.js, REST APIs  
**Database:** MongoDB, Mongoose  
**Authentication:** JWT, bcrypt  
**Tools:** VS Code, Git, GitHub, npm

## 📁 Project Structure

```text
Click-Cart/
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
│   ├── css/
│   └── js/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── config/
│
├── .gitignore
└── README.md
```

## 🏗️ How It Works

```text
Frontend
   │
   │ HTTP Requests
   ▼
Express.js / Node.js
   │
   ├── Routes
   ├── Middleware
   └── Controllers
          │
          ▼
       Mongoose
          │
          ▼
       MongoDB
```

The frontend communicates with the backend through REST APIs. Express handles the requests, controllers contain the application logic, and Mongoose is used to work with MongoDB.

## 🔐 Authentication

Click-Cart uses JWT for authentication and bcrypt for password hashing.

```text
Login / Register
       ↓
Backend validates user
       ↓
bcrypt verifies password
       ↓
JWT is generated
       ↓
Protected requests use JWT
       ↓
Authentication middleware
       ↓
Controller → Database
```

## ⚙️ Setup

Clone the repository:

```bash
git clone https://github.com/dineshtelegrapu/Click-Cart.git
cd Click-Cart
```

Install backend dependencies:

```bash
cd backend
npm install
```

Create a `.env` file inside `backend`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

Or:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:5000
```

Open the `frontend` folder using Live Server or another frontend development server.

> Never upload `.env` or secret keys to GitHub.

## 🔮 Future Improvements

- Online payment integration
- Product reviews and ratings
- Advanced filtering and pagination
- Email notifications
- Admin analytics
- Image uploads
- Order tracking
- Automated testing
- Docker and cloud deployment
- CI/CD

## 📚 What I Learned

This project helped me understand how a full-stack application works from frontend to database. I gained practical experience with REST APIs, Node.js, Express.js, MongoDB, Mongoose, JWT authentication, bcrypt, middleware, CRUD operations, and Git/GitHub.

## 👨‍💻 Author

**Dinesh**

GitHub: https://github.com/dineshtelegrapu

Built as a personal project to improve my full-stack web development and software engineering skills.

⭐ If you find the project useful, feel free to star the repository.
