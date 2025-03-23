document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the values from the input fields
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Simple form validation
    if (email === "" || password === "") {
        alert("Please fill in both email and password.");
    } else {
        alert("Login successful! Welcome.");
        // You can replace the alert with redirection or further actions
        // For example:
        // window.location.href = "home.html"; // Redirect to the homepage
    }
});
