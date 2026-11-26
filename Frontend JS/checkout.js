// ======================================================
// Clik-Cart - CHECKOUT JAVASCRIPT
// ======================================================

const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {

    // GET CART AND AUTHENTICATION
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // HTML ELEMENTS
    const checkoutProducts =
        document.getElementById("checkout-products");

    const checkoutItems =
        document.getElementById("checkout-items");

    const checkoutSubtotal =
        document.getElementById("checkout-subtotal");

    const checkoutTotal =
        document.getElementById("checkout-total");

    const placeOrderButton =
        document.getElementById("placeOrder");

    // CHECK LOGIN
    if (!user || !token || isLoggedIn !== "true") {
        alert("Please login first.");
        window.location.href = "login.html";
    }

    // CHECK EMPTY CART
    else if (cart.length === 0) {
        alert("Your cart is empty.");
        window.location.href = "products.html";
    }

    else {

        // DISPLAY CHECKOUT PRODUCTS
        function displayCheckoutProducts() {

            checkoutProducts.innerHTML = "";

            let totalItems = 0;
            let subtotal = 0;

            cart.forEach(product => {

                const productTotal =
                    Number(product.price) * Number(product.quantity);

                totalItems += Number(product.quantity);
                subtotal += productTotal;

                const productCard = document.createElement("div");
                productCard.className = "checkout-product";

                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">

                    <div class="checkout-product-info">
                        <h3>${product.name}</h3>
                        <p>Quantity: ${product.quantity}</p>
                        <p>Price: $${product.price}</p>
                        <strong>$${productTotal}</strong>
                    </div>
                `;

                checkoutProducts.appendChild(productCard);
            });

            checkoutItems.textContent = totalItems;
            checkoutSubtotal.textContent = "$" + subtotal;
            checkoutTotal.textContent = "$" + subtotal;
        }

        // PLACE ORDER
        checkoutForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            // GET CUSTOMER INFORMATION
            const fullName =
                document.getElementById("fullName").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const address =
                document.getElementById("address").value.trim();

            const city =
                document.getElementById("city").value.trim();

            const state =
                document.getElementById("state").value.trim();

            const pincode =
                document.getElementById("pincode").value.trim();

            const paymentMethod =
                document.querySelector('input[name="payment"]:checked');

            // VALIDATION
            if (
                !fullName ||
                !phone ||
                !address ||
                !city ||
                !state ||
                !pincode
            ) {
                alert("Please fill in all delivery information.");
                return;
            }

            if (!paymentMethod) {
                alert("Please select a payment method.");
                return;
            }

            // CHECK PRODUCT IDs
            if (cart.some(product =>
                !product.productId ||
                !Number.isInteger(Number(product.quantity)) ||
                Number(product.quantity) < 1
            )) {
                alert("Your cart contains invalid products. Please add the products again.");
                return;
            }

            // PREPARE ORDER DATA
            const orderData = {

                products: cart.map(product => ({
                    productId: product.productId,
                    quantity: Number(product.quantity)
                })),

                customer: {
                    name: fullName,
                    phone: phone,
                    address: address,
                    city: city,
                    state: state,
                    pincode: pincode
                },

                paymentMethod: paymentMethod.value
            };

            try {

                // DISABLE BUTTON
                placeOrderButton.disabled = true;
                placeOrderButton.textContent = "Placing Order...";

                // SEND ORDER TO BACKEND
                const response = await fetch(
                    "http://localhost:5000/api/orders",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },

                        body: JSON.stringify(orderData)
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Unable to place order."
                    );
                }

                // CLEAR CART ONLY AFTER SUCCESS
                localStorage.removeItem("cart");

                alert("Order placed successfully!");

                window.location.href = "orders.html";

            }

            catch (error) {

                console.error("Order placement error:", error);

                alert(error.message || "Unable to connect to the server. Please try again.");

            }

            finally {

                placeOrderButton.disabled = false;
                placeOrderButton.textContent = "Place Order";

            }

        });

        // INITIAL LOAD
        displayCheckoutProducts();
    }
}