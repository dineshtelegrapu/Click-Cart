// SIGNUP PAGE

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    const signupPassword = document.getElementById("signupPassword");

    const confirmPassword = document.getElementById("confirmPassword");

    const showPassword = document.getElementById("signupShowPassword");


    // Show / Hide Password
    if (showPassword) {
        showPassword.addEventListener("change", () => {

            if (showPassword.checked) {
                signupPassword.type = "text";
                confirmPassword.type = "text";
            }
            
            else {
                signupPassword.type = "password";
                confirmPassword.type = "password";
            }
        });
    }


    // Signup
    signupForm.addEventListener("submit", (e) => {

        e.preventDefault();


        const name = document.getElementById("signupName").value.trim();

        const email = document.getElementById("signupEmail").value.trim();

        const password = signupPassword.value;

        const confirm = confirmPassword.value;

        // Check empty fields
        if (name === "" || email === "" || password === "" || confirm === "") {
            alert("Please fill in all fields.");

            return;

        }


        // Check password length
        if (password.length < 6) {

            alert(
                "Password must contain at least 6 characters."
            );

            return;

        }


        // Check passwords
        if (password !== confirm) {
            alert("Passwords do not match!");

            return;

        }


        // Create user
        const user = {
            name: name,
            email: email,
            password: password

        };


        // Save user
        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        alert("Account created successfully!");

        // Go to login page
        window.location.href = "login.html";

    });
}
