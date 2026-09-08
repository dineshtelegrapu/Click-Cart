// ======================================================
// WISHLIST PAGE
// ======================================================

const wishlistContainer =
    document.getElementById("wishlist-container");

if (wishlistContainer) {

    const emptyWishlist = document.getElementById("empty-wishlist");


    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];


    // ==========================================
    // DISPLAY WISHLIST
    // ==========================================

    function displayWishlist() {

        wishlistContainer.innerHTML = "";


        // Empty wishlist
        if (wishlist.length === 0) {

            emptyWishlist.style.display = "block";

            return;

        }


        emptyWishlist.style.display = "none";


        // Display products
        wishlist.forEach((product, index) => {

            const card =
                document.createElement("div");

            card.className =
                "wishlist-card";


            card.innerHTML = `

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >


                <div class="wishlist-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${product.description}
                    </p>

                    <div class="wishlist-price">
                        $${product.price}
                    </div>


                    <div class="wishlist-buttons">

                        <button
                            class="wishlist-cart-btn"
                            data-index="${index}"
                        >
                            Add to Cart
                        </button>


                        <button
                            class="wishlist-remove-btn"
                            data-index="${index}"
                        >
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
        document
        .querySelectorAll(".wishlist-cart-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.dataset.index);


                const product =
                    wishlist[index];


                let cart =
                    JSON.parse(localStorage.getItem("cart")) || [];


                const existingProduct =
                    cart.find(item =>item.name === product.name);


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

                        name: product.name,

                        description:
                            product.description,

                        price: product.price,

                        image: product.image,

                        quantity: 1

                    });

                }


                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );


                alert(
                    product.name +
                    " added to cart!"
                );

            });

        });


        // Remove from Wishlist
        document
        .querySelectorAll(".wishlist-remove-btn")
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


    // Initial display
    displayWishlist();

}

// ADD TO WISHLIST

const wishlistButtons =
    document.querySelectorAll(".wishlist-btn");

wishlistButtons.forEach(button => {

    button.addEventListener("click", function () {

        const card = this.closest(".product-card");

        const name = card.querySelector("h3").textContent;

        const description = card.querySelector("p").textContent;

        const price =
            Number(
                card
                .querySelector(".price")
                .textContent
                .replace("$", "")
            );

        const image = card.querySelector("img").src;


        let wishlist =
            JSON.parse(localStorage.getItem("wishlist")) || [];


        const alreadyExists =
            wishlist.some(item => item.name === name);


        if (alreadyExists) {

            alert(name + " is already in your wishlist!");

            return;

        }


        wishlist.push({

            name: name,

            description: description,

            price: price,

            image: image

        });


        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );


        alert(name + " added to wishlist!");

    });

});
