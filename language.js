// LANGUAGE TRANSLATION - CLIK-CART

const translations = {

    en: {
        language: "Language",
        home: "Home",
        cart: "Cart",
        products: "Products",
        wishlist: "Wishlist",
        login: "Login",
        signup: "Sign Up",
        featured: "Featured Products",
        shopNow: "Shop Now",
        checkOut: "Check it Out",
        addToCart: "Add to Cart",
        remove: "Remove",
        price: "Price",
        search: "Search products...",
        emptyCart: "Your cart is empty",
        proceed: "Proceed to Buy"
    },

    hi: {
        language: "भाषा",
        home: "होम",
        cart: "कार्ट",
        products: "उत्पाद",
        wishlist: "इच्छा सूची",
        login: "लॉगिन",
        signup: "साइन अप",
        featured: "विशेष उत्पाद",
        shopNow: "अभी खरीदें",
        checkOut: "देखें",
        addToCart: "कार्ट में जोड़ें",
        remove: "हटाएं",
        price: "कीमत",
        search: "उत्पाद खोजें...",
        emptyCart: "आपकी कार्ट खाली है",
        proceed: "खरीदने के लिए आगे बढ़ें"
    },

    te: {
        language: "భాష",
        home: "హోమ్",
        cart: "కార్ట్",
        products: "ఉత్పత్తులు",
        wishlist: "కోరికల జాబితా",
        login: "లాగిన్",
        signup: "సైన్ అప్",
        featured: "ప్రత్యేక ఉత్పత్తులు",
        shopNow: "ఇప్పుడే కొనండి",
        checkOut: "చూడండి",
        addToCart: "కార్ట్‌కు జోడించండి",
        remove: "తొలగించండి",
        price: "ధర",
        search: "ఉత్పత్తులను వెతకండి...",
        emptyCart: "మీ కార్ట్ ఖాళీగా ఉంది",
        proceed: "కొనుగోలుకు కొనసాగండి"
    }
};


// ==========================================
// ELEMENTS
// ==========================================

const languageMenu = document.querySelector(".language-menu");
const languageButton = document.getElementById("language-btn");
const languageOptions = document.querySelectorAll(".language-dropdown a");

// CHANGE WEBSITE LANGUAGE
function changeLanguage(lang) {
    if (!translations[lang]) return;

    // Save selected language
    localStorage.setItem("selectedLanguage", lang);

    // Translate all elements
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }

    });

    // Translate placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
        const key = element.dataset.i18nPlaceholder;
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }

    });

    // Update language button
    if (languageButton) {
        languageButton.textContent = translations[lang].language + " ▼";
    }

    // Update selected option
    languageOptions.forEach(option => {
        option.classList.toggle(
            "selected",
            option.dataset.lang === lang
        );
    });
}

// OPEN / CLOSE LANGUAGE DROPDOWN

if (languageButton && languageMenu) {
    languageButton.addEventListener("click", function(event) {
        event.preventDefault();

        languageMenu.classList.toggle("active");

    });

}

// SELECT LANGUAGE

languageOptions.forEach(option => {
    option.addEventListener("click", function(event) {

        event.preventDefault();
        const selectedLang = this.dataset.lang;
        changeLanguage(selectedLang);
        languageMenu.classList.remove("active");
    });
});

// CLOSE DROPDOWN WHEN CLICKING OUTSIDE

document.addEventListener("click", function(event) {
    if (languageMenu && !languageMenu.contains(event.target)) {
        languageMenu.classList.remove("active");
    }

});

// LOAD SAVED LANGUAGE

const savedLanguage = localStorage.getItem("selectedLanguage") || "en";

changeLanguage(savedLanguage);
