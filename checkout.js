// ======================================================
// Clik-Cart - CHECKOUT JAVASCRIPT
// ======================================================


// CHECKOUT PAGE

const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {

    // Get cart
    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    // Get HTML elements
    const checkoutProducts =
        document.getElementById("checkout-products");

    const checkoutItems =
        document.getElementById("checkout-items");

    const checkoutSubtotal =
        document.getElementById("checkout-subtotal");

    const checkoutTotal =
        document.getElementById("checkout-total");


    // ==================================================
    // CHECK LOGIN
    // ==================================================

    const user = JSON.parse(localStorage.getItem("user"));

    const isLoggedIn = localStorage.getItem("isLoggedIn");


    if (!user || isLoggedIn !== "true") {

        alert("Please login first.");

        window.location.href = "login.html";

    }


    // ==================================================
    // CHECK EMPTY CART
    // ==================================================

    if (cart.length === 0) {

        alert("Your cart is empty.");

        window.location.href = "products.html";

    }


    // ==================================================
    // DISPLAY CHECKOUT PRODUCTS
    // ==================================================

    function displayCheckoutProducts() {

        checkoutProducts.innerHTML = "";

        let totalItems = 0;
        let subtotal = 0;


        cart.forEach(product => {

            const productTotal =
                Number(product.price) *
                Number(product.quantity);


            totalItems +=
                Number(product.quantity);


            subtotal += productTotal;


            const productCard =
                document.createElement("div");

            productCard.className =
                "checkout-product";


            productCard.innerHTML = `

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="checkout-product-info">

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

                    <strong>
                        $${productTotal}
                    </strong>

                </div>

            `;

            checkoutProducts.appendChild(productCard);
        });


        // Update summary

        checkoutItems.textContent = totalItems;

        checkoutSubtotal.textContent = "$" + subtotal;

        checkoutTotal.textContent = "$" + subtotal;

    }

    // PLACE ORDER

    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // Get customer information

            const fullName =
                document
                .getElementById("fullName")
                .value
                .trim();


            const phone =
                document
                .getElementById("phone")
                .value
                .trim();


            const address =
                document
                .getElementById("address")
                .value
                .trim();


            const city =
                document
                .getElementById("city")
                .value
                .trim();


            const state =
                document
                .getElementById("state")
                .value
                .trim();


            const pincode =
                document
                .getElementById("pincode")
                .value
                .trim();


            const paymentMethod =
                document
                .querySelector(
                    'input[name="payment"]:checked'
                );

            // VALIDATION

            if (
                fullName === "" ||
                phone === "" ||
                address === "" ||
                city === "" ||
                state === "" ||
                pincode === ""
            ) {

                alert("Please fill in all delivery information.");

                return;

            }


            if (!paymentMethod) {

                alert("Please select a payment method.");

                return;

            }

            // CALCULATE TOTAL

            let total = 0;

            cart.forEach(product => {

                total +=
                    Number(product.price) *
                    Number(product.quantity);

            });

            // CREATE ORDER

            const order = {

                id:
                    "ORD-" +
                    Date.now(),

                date:
                    new Date().toLocaleString(),

                status:
                    "Placed",

                userEmail:
                    user.email,

                customer: {

                    name:
                        fullName,

                    phone:
                        phone,

                    address:
                        address,

                    city:
                        city,

                    state:
                        state,

                    pincode:
                        pincode

                },

                paymentMethod:
                    paymentMethod.value,

                products:
                    cart,

                total:
                    total

            };

            // GET EXISTING ORDERS

            let orders =
                JSON.parse(
                    localStorage.getItem("orders")
                ) || [];


            // Add new order

            orders.push(order);


            // Save orders

            localStorage.setItem(
                "orders",
                JSON.stringify(orders)
            );

            // CLEAR CART

            localStorage.removeItem("cart");

            // SUCCESS

            alert(
                "Order placed successfully!"
            );

            window.location.href =
                "orders.html";

        }
    );

    // INITIAL LOAD
    displayCheckoutProducts();
}
