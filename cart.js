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
