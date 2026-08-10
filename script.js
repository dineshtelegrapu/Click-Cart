// ======================================================
// CLik-Cart - MAIN JAVASCRIPT
// ======================================================

// PROFILE PAGE

const profileName = document.getElementById("profile-name");

if (profileName) {

    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // Check if user is logged in
    if (!user || isLoggedIn !== "true") {

        alert("Please login first.");

        window.location.href = "login.html";

    } else {

        // Display user information
        document.getElementById("profile-name").textContent = user.name;
        document.getElementById("profile-email").textContent = user.email;
        document.getElementById("user-name").textContent = user.name;
        document.getElementById("user-email").textContent = user.email;

    }


    // Logout
    const logoutButton = document.getElementById("logoutButton");

    if (logoutButton) {

        logoutButton.addEventListener("click", () => {

            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userEmail");

            alert("You have been logged out.");

            window.location.href = "login.html";

        });

    }

}



// ======================================================
// SIGNUP PAGE
// ======================================================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    const signupPassword =
        document.getElementById("signupPassword");

    const confirmPassword =
        document.getElementById("confirmPassword");

    const showPassword =
        document.getElementById("signupShowPassword");


    // Show / Hide Password
    if (showPassword) {

        showPassword.addEventListener("change", () => {

            if (showPassword.checked) {

                signupPassword.type = "text";
                confirmPassword.type = "text";

            } else {

                signupPassword.type = "password";
                confirmPassword.type = "password";

            }

        });

    }


    // Signup
    signupForm.addEventListener("submit", (e) => {

        e.preventDefault();


        const name =
            document.getElementById("signupName").value.trim();

        const email =
            document.getElementById("signupEmail").value.trim();

        const password =
            signupPassword.value;

        const confirm =
            confirmPassword.value;

        // Check empty fields
        if (name === "" || email === "" || password === "" || confirm === "") {
            alert("Please fill in all fields.");

            return;

        }


        // Check password length
        if (password.length < 6) {

            alert(
                "Password must contain at least 6 characters."
            );

            return;

        }


        // Check passwords
        if (password !== confirm) {
            alert("Passwords do not match!");

            return;

        }


        // Create user
        const user = {
            name: name,
            email: email,
            password: password

        };


        // Save user
        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        alert("Account created successfully!");

        // Go to login page
        window.location.href = "login.html";

    });
}

// LOGIN PAGE

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    const password = document.getElementById("password");
    const showPassword = document.getElementById("showPassword");

    // Show / Hide Password
    if (showPassword) {
        showPassword.addEventListener("change", () => {

            if (showPassword.checked) {
                password.type = "text";
            }
            else {
                password.type = "password";
            }

        });

    }


    // Login
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value.trim();
        const pass = password.value;


        // Check empty fields
        if (email === "" || pass === "") {
            alert("Please fill in all fields.");

            return;

        }

        // Get saved user
        const savedUser =
            JSON.parse(localStorage.getItem("user"));


        // Check if account exists
        if (!savedUser) {
            alert("Account not found. Please sign up first.");

            return;

        }

        // Check email
        if (email !== savedUser.email) {
            alert("Incorrect email.");

            return;

        }

        // Check password
        if (pass !== savedUser.password) {
            alert("Incorrect password.");

            return;

        }

        // Login successful
        localStorage.setItem(
            "isLoggedIn",
            "true"
        );

        localStorage.setItem(
            "userEmail",
            email
        );

        alert("Login Successful!");

        // Go to home
        window.location.href = "index.html";

    });

}

// PRODUCTS PAGE

const productSearchBar =
    document.querySelector(".search-bar");

if (productSearchBar && document.querySelector(".product-card")) {

    const productCards = document.querySelectorAll(".product-card");
    // Search Products
    productSearchBar.addEventListener(
        "input",
        function () {
            const searchText =
                this.value.toLowerCase();


            productCards.forEach(card => {

                const productName =
                    card
                    .querySelector("h3")
                    .textContent
                    .toLowerCase();

                if (productName.includes(searchText)) {
                    card.style.display = "block";
                }
                else {
                    card.style.display = "none";
                }
            });
        }
    );

    // Add To Cart

    const addButtons =
        document.querySelectorAll(".btn");

    addButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {


                // Check login
                const isLoggedIn =
                    localStorage.getItem("isLoggedIn");

                if (isLoggedIn !== "true") {
                    alert("Please login first.");

                    window.location.href =
                        "login.html";

                    return;
                }

                const card =
                    this.closest(".product-card");

                const name =
                    card
                    .querySelector("h3")
                    .textContent;

                const description =
                    card
                    .querySelector("p")
                    .textContent;

                const price =
                    Number(
                        card
                        .querySelector(".price")
                        .textContent
                        .replace("$", ""));

                const image =
                    card
                    .querySelector("img")
                    .src;

                // Get cart
                let cart = JSON.parse(localStorage.getItem("cart")) || [];

                // Find product
                const existingProduct =
                    cart.find(item => item.name === name);

                // Product already exists
                if (existingProduct) {
                    if (existingProduct.quantity < 10) {
                        existingProduct.quantity++;
                    }
                    else {
                        alert(
                            "Maximum quantity (10) reached!"
                        );
                        return;
                    }
                }

                // New product
                else {
                    cart.push({
                        name: name,
                        description: description,
                        price: price,
                        image: image,
                        quantity: 1
                    });
                }

                // Save cart
                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );
                alert(
                    name + " added to cart!"
                );
            }
        );
    });
}

// CART PAGE

const cartContainer =
    document.getElementById("cart-container");

if (cartContainer) {

    // Get cart
    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    const totalItems =
        document.getElementById("total-items");

    const totalAmount =
        document.getElementById("total-amount");

    const cartIconCount =
        document.querySelector(
            ".cart-card-count"
        );

    const searchBar =
        document.querySelector(".search-bar");

    // DISPLAY CART

    function displayCart() {
        cartContainer.innerHTML = "";

        // Empty cart
        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <h2>Your cart is empty</h2>
                    <p>
                        Add some products to your cart.
                    </p>
                    <a href="products.html">
                        Continue Shopping
                    </a>
                </div>`;
            updateSummary();
            return;

        }

        // Display products
        cart.forEach((product, index) => {

            const card =
                document.createElement("div");

            card.className =
                "cart-card";

            card.dataset.price =
                product.price;

            card.innerHTML = `

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="cart-card-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${product.description}
                    </p>

                    <div class="price">
                        $${product.price}
                    </div>

                    <h4 class="cart-count">
                        ${product.quantity}
                    </h4>

                    <a
                        href="#"
                        class="add-to-cart"
                        data-index="${index}"
                    >
                        Add 1 +
                    </a>

                    <a
                        href="#"
                        class="remove-from-cart"
                        data-index="${index}"
                    >
                        Remove
                    </a>
                </div>
            `;
            cartContainer.appendChild(card);
        });
        addCartEvents();
        updateSummary();
    }

    // ADD / REMOVE CART EVENTS

    function addCartEvents() {


        // Add quantity
        document
        .querySelectorAll(".add-to-cart")
        .forEach(button => {


            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    const index = Number(this.dataset.index);
                    if (cart[index].quantity < 10) {
                        cart[index].quantity++;
                        saveCart();
                    }
                    else {
                        alert(
                            "Maximum quantity of 10 reached!"
                        );
                    }
                }
            );
        });

        // Remove product

        document
        .querySelectorAll(".remove-from-cart")
        .forEach(button => {
            button.addEventListener(
                "click",
                function (event) {
                    event.preventDefault();
                    const index = Number(this.dataset.index);
                    cart.splice(index, 1);
                    saveCart();
                }
            );
        });
    }

    // UPDATE SUMMARY

    function updateSummary() {
        let items = 0;
        let amount = 0;

        cart.forEach(product => {

            items += Number(product.quantity);
            amount += Number(product.price) * Number(product.quantity);
        });


        if (totalItems) {
            totalItems.textContent =
                items;
        }
        if (totalAmount) {
            totalAmount.textContent =
                "$" + amount;
        }
        if (cartIconCount) {
            cartIconCount.textContent =
                items;
        }
    }

    // SAVE CART

    function saveCart() {

        localStorage.setItem(
            "cart", JSON.stringify(cart)
        );
        displayCart();
    }

    // CART SEARCH

    if (searchBar) {
        searchBar.addEventListener(
            "input",
            function () {
                const searchText = this.value.toLowerCase();
                document.querySelectorAll(".cart-card").forEach(card => {

                    const productName =
                        card
                        .querySelector("h3")
                        .textContent
                        .toLowerCase();
                    if (productName.includes(searchText)) {
                        card.style.display = "flex";
                    }
                    else {
                        card.style.display = "none";
                    }
                });
            }
        );
    }

    // INITIAL CART LOAD
    displayCart();
}
