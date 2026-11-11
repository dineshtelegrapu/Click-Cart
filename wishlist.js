// WISHLIST PAGE
const wishlistContainer = document.getElementById("wishlist-container");
if (wishlistContainer) {
    const emptyWishlist = document.getElementById("empty-wishlist");
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // DISPLAY WISHLIST
    function displayWishlist() {
        wishlistContainer.innerHTML = "";

        // Empty wishlist
        if (wishlist.length === 0) {
            if (emptyWishlist) {
                emptyWishlist.style.display = "block";
            }
            return;
        }

        if (emptyWishlist) {
            emptyWishlist.style.display = "none";
        }

        // Display products
        wishlist.forEach((product, index) => {
            const card = document.createElement("div");
            card.className = "wishlist-card";
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="wishlist-info">

                    <h3>${product.name}</h3>

                    <p>${product.description || ""}</p>

                    <div class="wishlist-price">
                        ₹${Number(product.price).toLocaleString("en-IN")}
                    </div>

                    <div class="wishlist-buttons">

                        <button
                            class="wishlist-cart-btn"
                            data-index="${index}">
                            Add to Cart
                        </button>

                        <button
                            class="wishlist-remove-btn"
                            data-index="${index}">
                            Remove
                        </button>

                    </div>

                </div>
            `;
            wishlistContainer.appendChild(card);
        });
        addWishlistEvents();
    }

    // WISHLIST EVENTS
    function addWishlistEvents() {
        // Add to Cart
        document.querySelectorAll(".wishlist-cart-btn")
            .forEach(button => {
                button.addEventListener("click", () => {
                    const index = Number(button.dataset.index);
                    const product = wishlist[index];
                    let cart = JSON.parse(localStorage.getItem("cart")) || [];

                    const existingProduct = cart.find(
                        item => item.productId === product.productId
                    );

                    if (existingProduct) {

                        if (existingProduct.quantity < 10) {
                            existingProduct.quantity++;
                        } else {
                            alert("Maximum quantity (10) reached!");
                            return;
                        }

                    }
                    else {
                        cart.push({
                            productId: product.productId,
                            name: product.name,
                            description: product.description || "",
                            price: Number(product.price),
                            image: product.image,
                            quantity: 1
                        });

                    }

                    localStorage.setItem("cart", JSON.stringify(cart));
                    alert(product.name + " added to cart!");

                });

            });

        // Remove from Wishlist
        document.querySelectorAll(".wishlist-remove-btn")
            .forEach(button => {
                button.addEventListener("click", () => {
                    const index = Number(button.dataset.index);

                    wishlist.splice(index, 1);
                    localStorage.setItem(
                        "wishlist",
                        JSON.stringify(wishlist)
                    );

                    displayWishlist();

                });

            });

    }

    // INITIAL DISPLAY
    displayWishlist();
}
