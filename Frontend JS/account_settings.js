// ACCOUNT SETTINGS PAGE

const saveSettings = document.getElementById("saveSettings");
if (saveSettings) {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

        alert("Please login first.");
        window.location.href = "login.html";

    }
    
    else {

        const nameInput = document.getElementById("settingsName");

        const emailInput = document.getElementById("settingsEmail");

        const currentPassword = document.getElementById("currentPassword");

        const newPassword = document.getElementById("newPassword");

        const confirmNewPassword = document.getElementById("confirmNewPassword");

        const showPassword = document.getElementById("settingsShowPassword");


        // Load current information
        nameInput.value = user.name;
        emailInput.value = user.email;


        // Show / Hide passwords
        if (showPassword) {

            showPassword.addEventListener("change", () => {

                const type =
                    showPassword.checked
                        ? "text"
                        : "password";

                currentPassword.type = type;
                newPassword.type = type;
                confirmNewPassword.type = type;
            });
        }


        // Save settings
        saveSettings.addEventListener("click", () => {

            const newName = nameInput.value.trim();

            const newEmail = emailInput.value.trim();

            const currentPass = currentPassword.value;

            const newPass = newPassword.value;

            const confirmPass = confirmNewPassword.value;


            if (newName === "" || newEmail === "") {

                alert("Name and email cannot be empty.");

                return;

            }


            // Change password
            if (newPass !== "" || confirmPass !== "") {

                if (currentPass !== user.password) {
                    alert("Current password is incorrect.");

                    return;

                }


                if (newPass.length < 6) {
                    alert("New password must contain at least 6 characters.");

                    return;

                }


                if (newPass !== confirmPass) {
                    alert("New passwords do not match.");

                    return;

                }
                user.password = newPass;
            }


            // Update user
            user.name = newName;
            user.email = newEmail;


            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );


            localStorage.setItem(
                "userEmail",
                newEmail
            );


            alert("Settings saved successfully!");
            window.location.href = "profile.html";

        });

    }

}
