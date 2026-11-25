// SIGNUP PAGE

const signupForm = document.getElementById("signupForm");

if (signupForm) {
    const signupName = document.getElementById("signupName");
    const signupEmail = document.getElementById("signupEmail");
    const signupPassword = document.getElementById("signupPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const showPassword = document.getElementById("signupShowPassword");

    // Show / Hide Password
    if (showPassword) {
        showPassword.addEventListener("change", () => {
            const type = showPassword.checked ? "text" : "password";
            signupPassword.type = type;
            confirmPassword.type = type;
        });
    }

    // Signup
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = signupName.value.trim();
        const email = signupEmail.value.trim();
        const password = signupPassword.value;
        const confirm = confirmPassword.value;

        // Check empty fields
        if (!name || !email || !password || !confirm) {
            alert("Please fill in all fields.");
            return;
        }

        // Check password length
        if (password.length < 6) {
            alert("Password must contain at least 6 characters.");
            return;
        }

        // Check passwords
        if (password !== confirm) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Signup failed.");
                return;
            }

            alert("Account created successfully!");

            // Go to login page
            window.location.href = "../Frontend HTML/login.html";

        } catch (error) {
            console.error("Signup error:", error);
            alert("Unable to connect to the server. Please try again.");
        }
    });
}