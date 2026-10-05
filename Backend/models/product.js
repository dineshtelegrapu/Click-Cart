// PRODUCTS PAGE

const productSearchBar = document.querySelector(".search-bar");

if (productSearchBar && document.querySelector(".product-card")) {

    const productCards = document.querySelectorAll(".product-card");
    // Search Products
    productSearchBar.addEventListener(
        "input",
        function () {
            const searchText =
                this.value.toLowerCase();


            productCards.forEach(card => {

                const productName =
                    card
                    .querySelector("h3")
                    .textContent
                    .toLowerCase();

                if (productName.includes(searchText)) {
                    card.style.display = "block";
                }
                else {
                    card.style.display = "none";
                }
            });
        }
    );

    // Add To Cart

    const addButtons =
        document.querySelectorAll(".btn");

    addButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {


                // Check login
                const isLoggedIn =
                    localStorage.getItem("isLoggedIn");

                if (isLoggedIn !== "true") {
                    alert("Please login first.");

                    window.location.href =
                        "login.html";

                    return;
                }

                const card =
                    this.closest(".product-card");

                const name =
                    card
                    .querySelector("h3")
                    .textContent;

                const description =
                    card
                    .querySelector("p")
                    .textContent;

                const price =
                    Number(
                        card
                        .querySelector(".price")
                        .textContent
                        .replace("$", ""));

                const image =
                    card
                    .querySelector("img")
                    .src;

                // Get cart
                let cart = JSON.parse(localStorage.getItem("cart")) || [];

                // Find product
                const existingProduct =
                    cart.find(item => item.name === name);

                // Product already exists
                if (existingProduct) {
                    if (existingProduct.quantity < 10) {
                        existingProduct.quantity++;
                    }
                    else {
                        alert(
                            "Maximum quantity (10) reached!"
                        );
                        return;
                    }
                }

                // New product
                else {
                    cart.push({
                        name: name,
                        description: description,
                        price: price,
                        image: image,
                        quantity: 1
                    });
                }

                // Save cart
                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );
                alert(
                    name + " added to cart!"
                );
            }
        );
    });
}
