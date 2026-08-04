// LOGIN PAGE
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    const password = document.getElementById("password");
    const showPassword = document.getElementById("showPassword");
    showPassword.addEventListener("change", () => {
        password.type = showPassword.checked ? "text" : "password";
    });
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const pass = password.value.trim();
        if (email === "" || pass === "") {
            alert("Please fill in all fields.");
            return;
        }
        // Demo Login
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        alert("Login Successful!");
        window.location.href = "index.html";
    });
}
// PRODUCTS PAGE
const productSearchBar = document.querySelector(".search-bar");

if (productSearchBar && document.querySelector(".product-card")) {

    // Search Products
    const productCards = document.querySelectorAll(".product-card");

    productSearchBar.addEventListener("input", function () {

        const searchText = this.value.toLowerCase();

        productCards.forEach(card => {

            const productName = card.querySelector("h3").textContent.toLowerCase();

            card.style.display = productName.includes(searchText)
                ? "block"
                : "none";

        });

    });

    // Add To Cart
    const addButtons = document.querySelectorAll(".btn");
    addButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Check Login
            if (localStorage.getItem("isLoggedIn") !== "true") {
                alert("Please login first!");
                window.location.href = "login.html";
                return;
            }

            const card = this.closest(".product-card");

            const name = card.querySelector("h3").textContent;
            const description = card.querySelector("p").textContent;
            const price = Number(
                card.querySelector(".price").textContent.replace("$", "")
            );
            const image = card.querySelector("img").src;

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existingProduct = cart.find(item => item.name === name);
            if (existingProduct) {
                if (existingProduct.quantity < 10) {
                    existingProduct.quantity++;
                } 
                else {

                    alert("Maximum quantity (10) reached!");
                    return;
                }
            }
            else {
                cart.push({
                    name,
                    description,
                    price,
                    image,
                    quantity: 1
                });
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(name + " added to cart!");
        });
    });
}
// CART PAGE
const cartSearchBar = document.querySelector(".search-bar");
if (cartSearchBar && document.querySelector(".cart-card")) {
    // Search
    const cartCards = document.querySelectorAll(".cart-card");
    cartSearchBar.addEventListener("input", function () {
        const searchText = this.value.toLowerCase();
        cartCards.forEach(card => {
            const productName = card.querySelector("h3").textContent.toLowerCase();
            card.style.display = productName.includes(searchText)
                ? "block"
                : "none";
        });
    });
    const totalItems = document.getElementById("total-items");
    const totalAmount = document.getElementById("total-amount");
    const cartIconCount = document.querySelector(".cart-card-count");
    function updateSummary() {
        let items = 0;
        let amount = 0;
        document.querySelectorAll(".cart-card").forEach(card => {
            const quantity = Number(card.querySelector(".cart-count").textContent);
            const price = Number(card.dataset.price);
            items += quantity;
            amount += quantity * price;
        });
        if (totalItems) {
            totalItems.textContent = items;
        }
        if (totalAmount) {
            totalAmount.textContent = "$" + amount;
        }
        if (cartIconCount) {
            cartIconCount.textContent = items;
        }
    }
    const buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            const card = this.closest(".cart-card");
            const count = card.querySelector(".cart-count");
            let quantity = Number(count.textContent);
            if (quantity < 10) {
                quantity++;
                count.textContent = quantity;
            }
            else {
                alert("Maximum quantity (10) reached!");
            }
            updateSummary();
        });
    });
    updateSummary();
}
