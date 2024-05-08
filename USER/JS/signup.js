document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById("signup-form");
    const errorElement = document.getElementById("error");

    signupForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Get input values
        const username = document.getElementById("username").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Validate email format
        if (!isValidEmail(email)) {
            showError("Please enter a valid email address.");
            return;
        }

        // Check if all fields are filled
        if (username === "" || mobile === "" || email === "" || password === "") {
            showError("Please fill in all fields.");
            return;
        }

        // Save sign-up information to local storage
        saveSignupInfo(username, mobile, email, password);

        // Redirect or show success message
        // For now, let's just alert success
        alert("Sign up successful!");
    });

    function isValidEmail(email) {
        // Regular expression for email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function saveSignupInfo(username, mobile, email, password) {
        // Construct an object with the sign-up information
        const signupInfo = {
            username: username,
            mobile: mobile,
            email: email,
            password: password
        };

        // Convert the object to a JSON string
        const signupInfoJSON = JSON.stringify(signupInfo);

        // Save the JSON string to local storage
        localStorage.setItem("signupInfo", signupInfoJSON);
        saveotherinfo(username,mobile,email);
    }

    function showError(message) {
        // Display error message
        errorElement.innerText = message;
    }
});


function saveotherinfo(username,mobile,email){
    account("Cash");
    account("Phone pe");
    youcontact(username,mobile,email);  

    window.location.href = "../../HTML/Home.html";
}

function account(ac_name){
    let name = ac_name;
    let amount = 0;

        let aco_count = localStorage.getItem("aco_count") || 0;
        aco_count++;
        localStorage.setItem("aco_count", aco_count);

        let data = {
            name: name,
            initial: amount,
            total: amount,
            id: aco_count
        };

        localStorage.setItem("aco" + aco_count, JSON.stringify(data));

}

function youcontact(username,mobile,email){

        let con_count = localStorage.getItem("con_count");
        if (con_count){
            con_count++;
            localStorage.setItem("con_count", con_count);
        }else{     
            con_count = 1       
            localStorage.setItem("con_count", con_count);
        }
        let uniqueId = generateUniqueId();
        let data = {
            name: username + " (You)",
            mobile: mobile,
            email: email || "",
            id: con_count,
            staketime: uniqueId
        };

        localStorage.setItem("con"+con_count, JSON.stringify(data));
    
}

function generateUniqueId() {
    const timestamp = new Date().getTime(); // Get current time in milliseconds
    const uniqueId = timestamp; // Combine with a prefix (e.g., 'ID_')
    return uniqueId;
}