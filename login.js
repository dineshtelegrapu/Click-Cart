// LOGIN PAGE

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    const password = document.getElementById("password");
    const showPassword = document.getElementById("showPassword");

    // Show / Hide Password
    if (showPassword) {
        showPassword.addEventListener("change", () => {

            if (showPassword.checked) {
                password.type = "text";
            }
            else {
                password.type = "password";
            }

        });

    }


    // Login
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value.trim();
        const pass = password.value;


        // Check empty fields
        if (email === "" || pass === "") {
            alert("Please fill in all fields.");

            return;

        }

        // Get saved user
        const savedUser =
            JSON.parse(localStorage.getItem("user"));


        // Check if account exists
        if (!savedUser) {
            alert("Account not found. Please sign up first.");

            return;

        }

        // Check email
        if (email !== savedUser.email) {
            alert("Incorrect email.");

            return;

        }

        // Check password
        if (pass !== savedUser.password) {
            alert("Incorrect password.");

            return;

        }

        // Login successful
        localStorage.setItem(
            "isLoggedIn",
            "true"
        );

        localStorage.setItem(
            "userEmail",
            email
        );

        alert("Login Successful!");

        // Go to home
        window.location.href = "index.html";

    });

}
