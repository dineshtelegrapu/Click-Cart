// LOGIN PAGE

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    const emailInput = document.getElementById("email");
    const password = document.getElementById("password");
    const showPassword = document.getElementById("showPassword");

    // Show / Hide Password
    if (showPassword) {
        showPassword.addEventListener("change", () => {
            password.type = showPassword.checked ? "text" : "password";
        });
    }

    // Login
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const pass = password.value;

        // Check empty fields
        if (email === "" || pass === "") {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: pass
                })
            });

            const data = await response.json();

            // Check login response
            if (!response.ok) {
                alert(data.message || "Invalid email or password.");
                return;
            }

            // Save login details
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userEmail", data.user.email);

            alert("Login Successful!");

            // Go to home page
            window.location.href = "../Frontend HTML/index.html";

        } catch (error) {
            console.error("Login error:", error);
            alert("Unable to connect to the server. Please try again.");
        }
    });
}