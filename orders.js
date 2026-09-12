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
