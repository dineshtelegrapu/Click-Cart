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
const buttons = document.querySelectorAll(".add-to-cart");
const cartIconCount = document.querySelector(".cart-card-count");

let totalItems = 0;
buttons.forEach(button => {
    button.addEventListener("click", function (event) {
        event.preventDefault();

        const card = this.closest(".cart-card");

        // Increase card's quantity for the specific product on click
        const count = card.querySelector(".cart-count");
        count.textContent = Number(count.textContent) + 1;

        // Increase total cart count
        totalItems++;
        cartIconCount.textContent = totalItems;
    });
});