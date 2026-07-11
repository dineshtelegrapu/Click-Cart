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

buttons.forEach(button => {
    button.addEventListener("click", function (event) {
        event.preventDefault();

        const card = this.closest(".cart-card");
        const count = card.querySelector(".cart-count");
        // Increase card's quantity for the specific product on click upto a maximum limit of 10
        let currentCount = Number(count.textContent);

        if (currentCount < 10) {
            count.textContent = currentCount + 1;
        } else {
            alert("Maximum quantity (10) reached!");
        }
    });
});
