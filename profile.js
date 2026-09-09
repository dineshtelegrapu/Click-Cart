// PROFILE PAGE

const profileName = document.getElementById("profile-name");

if (profileName) {

    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // Check if user is logged in
    if (!user || isLoggedIn !== "true") {

        alert("Please login first.");

        window.location.href = "login.html";

    }
    
    else {

        // Display user information
        document.getElementById("profile-name").textContent = user.name;
        document.getElementById("profile-email").textContent = user.email;
        document.getElementById("user-name").textContent = user.name;
        document.getElementById("user-email").textContent = user.email;

    }


    // Logout
    const logoutButton = document.getElementById("logoutButton");

    if (logoutButton) {

        logoutButton.addEventListener("click", () => {

            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userEmail");

            alert("You have been logged out.");

            window.location.href = "login.html";

        });

    }

}
