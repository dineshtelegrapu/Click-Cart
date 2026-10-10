
const API_URL = "http://localhost:5500/api/products";
const productsContainer = document.getElementById("products-container");
const searchBar = document.getElementById("search-bar");

let allProducts = [];

async function fetchProducts() {
    try {
        productsContainer.textContent = "Loading products...";
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Could not fetch products");
        }
        const data = await response.json();
        allProducts = data.products || [];
        displayProducts(allProducts);
    } catch (error) {
        console.error("Product loading error:", error);
        productsContainer.textContent = "Unable to load products. Check that the backend and database are running.";
    }
}

function displayProducts(products) {
    productsContainer.replaceChildren();

    if (products.length === 0) {
        productsContainer.textContent = "No products found.";
        return;
    }

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        image.onerror = () => {
            image.onerror = null;
            image.src = "https://placehold.co/300x250?text=Product";
        };

        const info = document.createElement("div");
        info.className = "product-info";

        const name = document.createElement("h3");
        name.textContent = product.name;

        const description = document.createElement("p");
        description.textContent = product.description;

        const price = document.createElement("div");
        price.className = "price";
        price.textContent =
            `₹${Number(product.price).toLocaleString("en-IN")}`;

        const addButton = document.createElement("button");
        addButton.className = "btn";
        addButton.textContent = "Add to Cart";
        addButton.disabled = Number(product.stock) <= 0;

        if (addButton.disabled) {
            addButton.textContent = "Out of Stock";
        }

        addButton.addEventListener("click", () => {
            // Connect this to your existing cart logic next.
            alert(`${product.name} selected. Cart integration is next.`);
        });

        const wishlistButton = document.createElement("button");
        wishlistButton.className = "wishlist-btn";
        wishlistButton.textContent = "♡ Add to Wishlist";

        wishlistButton.addEventListener("click", () => {
            // Connect's this to existing wishlist logic next.
            alert(`${product.name} selected. Wishlist integration is next.`);
        });
        info.append(name, description, price, addButton, wishlistButton);
        card.append(image, info);
        productsContainer.appendChild(card);
    });
}

// Search products by name, description, or category
searchBar.addEventListener("input", () => {
    const query = searchBar.value.trim().toLowerCase();
    const filteredProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );

    displayProducts(filteredProducts);
});

fetchProducts();
