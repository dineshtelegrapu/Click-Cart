// ACCOUNT SETTINGS PAGE

const saveSettings = document.getElementById("saveSettings");

if (saveSettings) {

    const nameInput = document.getElementById("settingsName");
    const emailInput = document.getElementById("settingsEmail");
    const currentPassword = document.getElementById("currentPassword");
    const newPassword = document.getElementById("newPassword");
    const confirmNewPassword = document.getElementById("confirmNewPassword");
    const showPassword = document.getElementById("settingsShowPassword");

    const token = localStorage.getItem("token");

    let user = null;

    // CHECK LOGIN
    if (!token) {
        alert("Please login first.");
        window.location.href = "../Frontend HTML/login.html";
    }

    else {

        // LOAD USER PROFILE FROM BACKEND
        const loadProfile = async () => {

            try {
                const response = await fetch(
                    "http://localhost:5000/api/auth/me",
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Unable to load profile.");
                }

                user = data.user;

                nameInput.value = user.name;
                emailInput.value = user.email;

                // Update localStorage
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("userEmail", user.email);

            }

            catch (error) {
                console.error("Profile loading error:", error);
                alert(error.message || "Unable to load account details.");

                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userEmail");

                window.location.href = "../Frontend HTML/login.html";
            }
        };

        loadProfile();


        // SHOW / HIDE PASSWORD
        if (showPassword) {

            showPassword.addEventListener("change", () => {

                const type = showPassword.checked ? "text" : "password";

                currentPassword.type = type;
                newPassword.type = type;
                confirmNewPassword.type = type;

            });
        }


        // SAVE SETTINGS
        saveSettings.addEventListener("click", async () => {

            const newName = nameInput.value.trim();
            const newEmail = emailInput.value.trim();

            const currentPass = currentPassword.value;
            const newPass = newPassword.value;
            const confirmPass = confirmNewPassword.value;

            if (!newName || !newEmail) {
                alert("Name and email cannot be empty.");
                return;
            }

            if (newPass !== "" || confirmPass !== "" || currentPass !== "") {

                if (!currentPass || !newPass || !confirmPass) {
                    alert("Please fill in all password fields.");
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
            }

            // PREPARE DATA
            const updatedData = {
                name: newName,
                email: newEmail
            };

            if (newPass) {
                updatedData.currentPassword = currentPass;
                updatedData.newPassword = newPass;
            }

            try {

                saveSettings.disabled = true;
                saveSettings.textContent = "Saving...";

                const response = await fetch(
                    "http://localhost:5000/api/auth/settings",
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(updatedData)
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    alert(data.message || "Unable to update settings.");
                    return;
                }

                // UPDATE LOCALSTORAGE
                user = data.user;

                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("userEmail", user.email);

                alert("Account settings updated successfully!");

                window.location.href = "../Frontend HTML/profile.html";

            }

            catch (error) {

                console.error("Settings update error:", error);

                alert("Unable to connect to the server. Please try again.");

            }

            finally {

                saveSettings.disabled = false;
                saveSettings.textContent = "Save Changes";

            }

        });

    }

}