// Search bar
const searchBar = document.querySelector(".search-bar");
const products = document.querySelectorAll(".cart-card");

searchBar.addEventListener("input", function () {
    const searchText = this.value.toLowerCase();

    products.forEach(product => {
        const productName = product.querySelector("h3").textContent.toLowerCase();

        if (productName.includes(searchText)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
});

// Cart counter
let cartCount = 0;
const cartCounter = document.getElementById("cart-count");
const buttons = document.querySelectorAll(".add-to-cart");

buttons.forEach(button => {
    button.addEventListener("click", function(event) {
        event.preventDefault();

        cartCount++;
        cartCounter.textContent = cartCount;

        const productName = this.closest(".cart-card").querySelector("h3").textContent;

        console.log(productName + " added to cart");
    });
});