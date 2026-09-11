// ======================================================
// CLik-Cart - MAIN JAVASCRIPT
// ======================================================

// MY ORDERS PAGE

const ordersContainer = document.getElementById("orders-container");

if (ordersContainer) {

    const noOrders = document.getElementById("no-orders");

    const user = JSON.parse(localStorage.getItem("user"));

    const isLoggedIn = localStorage.getItem("isLoggedIn");


    // Check login
    if (!user || isLoggedIn !== "true") {

        alert("Please login first.");

        window.location.href = "login.html";

    }
    
    else {

        const orders =
            JSON.parse(
                localStorage.getItem("orders")
            ) || [];


        // No orders
        if (orders.length === 0) {
            noOrders.style.display = "block";
        }
        else {
            noOrders.style.display = "none";


            // Display orders
            orders.forEach(order => {

                const orderCard = document.createElement("div");

                orderCard.className = "order-card";

                let productsHTML = "";
                order.products.forEach(product => {

                    productsHTML += `
                        <div class="order-product">
                            <img
                                src="${product.image}"
                                alt="${product.name}"
                            >

                            <div class="order-product-info">

                                <h3>
                                    ${product.name}
                                </h3>

                                <p>
                                    Quantity:
                                    ${product.quantity}
                                </p>

                                <p>
                                    Price:
                                    $${product.price}
                                </p>
                            </div>

                        </div>

                    `;

                });

                orderCard.innerHTML = `

                    <div class="order-header">

                        <h3>
                            Order #${order.id}
                        </h3>

                        <span class="order-status">
                            ${order.status}
                        </span>

                    </div>

                    <p>
                        Date: ${order.date}
                    </p>

                    ${productsHTML}

                    <div class="order-footer">

                        <span class="order-total">
                            Total: $${order.total}
                        </span>

                    </div>

                `;

                ordersContainer.appendChild(orderCard);

            });

        }

    }

}

// ACCOUNT SETTINGS PAGE

const saveSettings = document.getElementById("saveSettings");

if (saveSettings) {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

        alert("Please login first.");
        window.location.href = "login.html";

    }
    
    else {

        const nameInput = document.getElementById("settingsName");

        const emailInput = document.getElementById("settingsEmail");

        const currentPassword = document.getElementById("currentPassword");

        const newPassword = document.getElementById("newPassword");

        const confirmNewPassword = document.getElementById("confirmNewPassword");

        const showPassword = document.getElementById("settingsShowPassword");


        // Load current information
        nameInput.value = user.name;
        emailInput.value = user.email;


        // Show / Hide passwords
        if (showPassword) {

            showPassword.addEventListener("change", () => {

                const type =
                    showPassword.checked
                        ? "text"
                        : "password";

                currentPassword.type = type;
                newPassword.type = type;
                confirmNewPassword.type = type;
            });
        }


        // Save settings
        saveSettings.addEventListener("click", () => {

            const newName = nameInput.value.trim();

            const newEmail = emailInput.value.trim();

            const currentPass = currentPassword.value;

            const newPass = newPassword.value;

            const confirmPass = confirmNewPassword.value;


            if (newName === "" || newEmail === "") {

                alert("Name and email cannot be empty.");

                return;

            }


            // Change password
            if (newPass !== "" || confirmPass !== "") {

                if (currentPass !== user.password) {
                    alert("Current password is incorrect.");

                    return;

                }


                if (newPass.length < 6) {
                    alert("New password must contain at least 6 characters.");

                    return;

                }


                if (newPass !== confirmPass) {
                    alert("New passwords do not match.");

                    return;

                }
                user.password = newPass;
            }


            // Update user
            user.name = newName;
            user.email = newEmail;


            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );


            localStorage.setItem(
                "userEmail",
                newEmail
            );


            alert("Settings saved successfully!");
            window.location.href = "profile.html";

        });

    }

}
