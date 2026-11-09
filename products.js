const API_URL = "http://localhost:5000/api/products";
const productsContainer = document.getElementById("products-container");
const searchBar = document.getElementById("search-bar");
const categoryLinks = document.querySelectorAll(
    ".filter-section a[data-category]"
);
let allProducts = [];
let selectedCategory = "All";

// Fetch Products from Backend
async function fetchProducts() {
    try {
        productsContainer.textContent = "Loading products...";
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Could not fetch products");
        }
        const data = await response.json();
        allProducts = data.products || [];
        filterProducts();
    }
    catch (error) {
        console.error("Product loading error:", error);
        productsContainer.textContent =
            "Unable to load products. Check that the backend and database are running.";
    }
}

// Display Products
function displayProducts(products) {
    productsContainer.replaceChildren();
    if (products.length === 0) {
        productsContainer.textContent = "No products found.";
        return;
    }

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        // Product Image
        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;

        image.onerror = () => {
            image.onerror = null;
            image.src = "https://placehold.co/300x250?text=Product";
        };

        // Product Information
        const info = document.createElement("div");
        info.className = "product-info";

        // Product Name
        const name = document.createElement("h3");
        name.textContent = product.name;

        // Product Description
        const description = document.createElement("p");
        description.textContent = product.description;

        // Product Price
        const price = document.createElement("div");
        price.className = "price";
        price.textContent =
            `₹${Number(product.price).toLocaleString("en-IN")}`;

        // Add to Cart Button
        const addButton = document.createElement("button");
        addButton.className = "btn";
        addButton.textContent = "Add to Cart";

        addButton.disabled = Number(product.stock) <= 0;

        if (addButton.disabled) {
            addButton.textContent = "Out of Stock";
        }

        addButton.addEventListener("click", () => {
            alert(`${product.name} selected. Cart integration is next.`);
        });

        // Wishlist Button
        const wishlistButton = document.createElement("button");
        wishlistButton.className = "wishlist-btn";
        wishlistButton.textContent = "♡ Add to Wishlist";

        wishlistButton.addEventListener("click", () => {
            alert(`${product.name} selected. Wishlist integration is next.`);
        });

        // Append Elements
        info.append(
            name,
            description,
            price,
            addButton,
            wishlistButton
        );

        card.append(image, info);

        productsContainer.appendChild(card);
    });
}

// Search and Category Filtering
function filterProducts() {

    const query = searchBar.value.trim().toLowerCase();

    const filteredProducts = allProducts.filter(product => {

        const matchesCategory =
            selectedCategory === "All" ||
            product.category.toLowerCase() ===
            selectedCategory.toLowerCase();

        const matchesSearch =
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
    });

    displayProducts(filteredProducts);
}

// Category Filtering
categoryLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        selectedCategory = link.dataset.category;
        filterProducts();
    });
});

// Search Bar Event
searchBar.addEventListener("input", filterProducts);

// Load Products
fetchProducts();
