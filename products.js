
const API_URL = "http://localhost:5000/api/products";

const productsContainer = document.getElementById("products-container");
const searchBar = document.getElementById("search-bar");
const categoryLinks = document.querySelectorAll(
    ".filter-section a[data-category]"
);

let allProducts = [];
let selectedCategory = "All";

// ADD PRODUCT TO CART
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(item =>
        item.productId === product._id
    );
    const stock = Number(product.stock);
    const maxQuantity = Math.min(10, stock);
    if (maxQuantity <= 0) {
        alert("Product is out of stock!");
        return;
    }
    if (existingProduct) {
        if (existingProduct.quantity >= maxQuantity) {
            alert("Maximum available quantity reached!");
            return;
        }
        existingProduct.quantity++;

    }
    else {
        cart.push({
            productId: product._id,
            name: product.name,
            image: product.image,
            price: Number(product.price),
            quantity: 1
        });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
}

// ADD PRODUCT TO WISHLIST
function addToWishlist(product) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const alreadyExists = wishlist.some(item =>
        item.productId === product._id
    );
    if (alreadyExists) {
        alert("Product is already in your wishlist!");
        return;
    }
    wishlist.push({
        productId: product._id,
        name: product.name,
        image: product.image,
        price: Number(product.price),
        description: product.description
    });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert(`${product.name} added to wishlist!`);
}

// FETCH PRODUCTS FROM BACKEND
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
        productsContainer.textContent = "Unable to load products. Check that the backend and database are running.";
    }
}

// DISPLAY PRODUCTS
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
            addToCart(product);
        });

        // Wishlist Button
        const wishlistButton = document.createElement("button");
        wishlistButton.className = "wishlist-btn";
        wishlistButton.textContent = "♡ Add to Wishlist";
        wishlistButton.addEventListener("click", () => {
            addToWishlist(product);
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

// SEARCH AND CATEGORY FILTERING
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

// CATEGORY FILTER EVENTS
categoryLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        selectedCategory = link.dataset.category;
        filterProducts();

    });

});

// SEARCH BAR EVENT
searchBar.addEventListener("input", filterProducts);

// LOAD PRODUCTS
fetchProducts();
