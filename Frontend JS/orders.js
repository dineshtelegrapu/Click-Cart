// MY ORDERS PAGE

const ordersContainer = document.getElementById("orders-container");

if (ordersContainer) {

    const noOrders = document.getElementById("no-orders");

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // Check login
    if (!user || isLoggedIn !== "true" || !token) {

        alert("Please login first.");
        window.location.href = "login.html";

    } else {

        const fetchOrders = async () => {

            try {

                const response = await fetch(
                    "http://localhost:5000/api/orders",
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Unable to fetch orders");
                }

                const orders = data.orders;

                ordersContainer.innerHTML = "";

                // No orders
                if (!orders || orders.length === 0) {
                    noOrders.style.display = "block";
                    return;
                }

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

                                    <h3>${product.name}</h3>

                                    <p>
                                        Quantity: ${product.quantity}
                                    </p>

                                    <p>
                                        Price: ₹${product.price}
                                    </p>

                                </div>
                            </div>
                        `;

                    });

                    const orderDate = new Date(
                        order.createdAt
                    ).toLocaleString("en-IN");

                    orderCard.innerHTML = `

                        <div class="order-header">

                            <h3>
                                Order #${order._id}
                            </h3>

                            <span class="order-status">
                                ${order.status}
                            </span>

                        </div>

                        <p>
                            Date: ${orderDate}
                        </p>

                        ${productsHTML}

                        <div class="order-footer">

                            <span class="order-total">
                                Total: ₹${order.total}
                            </span>

                        </div>

                    `;

                    ordersContainer.appendChild(orderCard);

                });

            } catch (error) {

                console.error("Fetch orders error:", error);

                noOrders.style.display = "none";

                ordersContainer.innerHTML = `
                    <p>Unable to load orders.
                    Please refresh the page and try again.</p>
                `;

            }

        };

        fetchOrders();

    }

}