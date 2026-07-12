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

// Total items display
const totalItems = document.getElementById("total-items");

// Add to Cart buttons
const buttons = document.querySelectorAll(".add-to-cart");
function updateTotalItems() {
    let total = 0;
    document.querySelectorAll("total-items").forEach(count => {
        total += Number(count.textContent);
    });
    totalItems.textContent = total;
}

buttons.forEach(button => {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        const card = this.closest(".cart-card");
        const count = card.querySelector(".cart-count");
        let currentCount = Number(count.textContent);

        if (currentCount < 10) {
            count.textContent = currentCount + 1;
            updateTotalItems();
        }
    });
});

// Setting initial total items when page loads
updateTotalItems();
