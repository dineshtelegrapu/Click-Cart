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

// Buying summary
const totalItems = document.getElementById("total-items");
const totalAmount = document.getElementById("total-amount");
const cartIconCount = document.querySelector(".cart-card-count");

// Add to Cart button
const buttons = document.querySelectorAll(".add-to-cart");

// Update total items and amount in buying summary and cart icon
function updateSummary() {

    let items = 0;
    let amount = 0;

    document.querySelectorAll(".cart-card").forEach(card => {

        const quantity = Number(card.querySelector(".cart-count").textContent);
        const price = Number(card.dataset.price);
        items += quantity;
        amount += quantity * price;

    });
    totalItems.textContent = items;
    totalAmount.textContent = "$" + amount;
    cartIconCount.textContent = items;
}

// Add item to cart
buttons.forEach(button => {

    button.addEventListener("click", function (event) {
        event.preventDefault();
        const card = this.closest(".cart-card");
        const count = card.querySelector(".cart-count");
        let quantity = Number(count.textContent);
        if (quantity < 10) {
            quantity++;
            count.textContent = quantity;
        }
        updateSummary();
    });
});

// Initial summary
updateSummary();
