document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form reload

    if (validationCheck()) {
        showToast("Success! Your form has been submitted.", "success");
        // Optionally, you can clear the form fields
        document.querySelector("form").reset();
    }
});

// Convert email field input to lowercase
function convertToLowercase(input) {
    input.value = input.value.toLowerCase(); // Automatically updates the field to lowercase
}

// Validate form fields
function validationCheck() {
    const nameField = document.querySelector('input[placeholder="Full Name"]');
    const emailField = document.querySelector('input[placeholder="E-Mail"]');
    const phoneField = document.querySelector('input[placeholder="Phone Number"]');
    const subjectField = document.querySelector('input[placeholder="Subject"]');
    const messageField = document.querySelector("#message");

    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const phone = phoneField.value.trim();
    const subject = subjectField.value.trim();
    const message = messageField.value.trim();

    // Regular expressions for validation
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!name || !nameRegex.test(name)) {

        if (window.innerWidth <= 910) {
            showToastBelowField(nameField, "Name can only contain letters and spaces.");
        } else {
            showToast("Name can only contain letters and spaces.");
        }


        return false;
    }

    if (!email || !emailRegex.test(email)) {
        if (window.innerWidth <= 910) {
            showToastBelowField(emailField, "Invalid email address. Please enter a valid email.");
        } else {
            showToast("Invalid email address. Please enter a valid email.");
        }

        return false;
    }

    if (!phone || !phoneRegex.test(phone)) {

        if (window.innerWidth <= 910) {
            showToastBelowField(phoneField, "Invalid phone number. Phone number must be exactly 10 digits.");
        } else {
            showToast("Invalid phone number. Phone number must be exactly 10 digits.");
        }


        return false;
    }

    if (!subject) {
        if (window.innerWidth <= 910) {
            showToastBelowField(subjectField, "Subject is missing. Please enter a subject.");
        } else {
            showToast("Subject is missing. Please enter a subject.");
        }


        return false;
    }

    if (!message) {

        if (window.innerWidth <= 910) {
            showToastBelowField(messageField, "Message cannot be blank. Please enter your message.");
        } else {
            showToast("Message cannot be blank. Please enter your message.");
        }


        return false;
    }

    return true; // Validation passed
}

// Restrict phone number field to 10 digits only
document.querySelector('input[placeholder="Phone Number"]').addEventListener("input", function (e) {
    const input = e.target;
    input.value = input.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    if (input.value.length > 10) {
        input.value = input.value.slice(0, 10); // Restrict to 10 digits
    }
});


// Show toast below the input field
function showToastBelowField(inputField, message, type = "error") {
    if (inputField) {
        // Remove existing error message
        let error = inputField.nextElementSibling;
        if (error && error.classList.contains("error-message")) {
            error.remove();
        }

        // Create and style the new error message
        const toast = document.createElement("div");
        toast.textContent = message;
        toast.className = "error-message";
        toast.style.color = "red";
        toast.style.fontSize = "12px";
        toast.style.marginTop = "5px";

        // Insert the message after the input field
        inputField.parentNode.insertBefore(toast, inputField.nextSibling);

        // Optionally, remove the message after a delay
        setTimeout(() => {
            if (toast.parentNode) toast.remove();
        }, 4000); // Automatically remove after 4 seconds
    } else {
        // Show success message below the form (not tied to any input field)
        const form = document.querySelector("form");
        const toast = document.createElement("div");
        toast.textContent = message;
        toast.style.color = "green";
        toast.style.fontSize = "14px";
        toast.style.marginTop = "10px";
        form.appendChild(toast);

        // Optionally, remove the success message after a delay
        setTimeout(() => {
            if (toast.parentNode) toast.remove();
        }, 4000);
    }
}



// Toast notification function
function showToast(message, type = "error") {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.padding = "10px 20px";
    toast.style.backgroundColor = type === "success" ? "green" : "red";
    toast.style.color = "white";
    toast.style.borderRadius = "5px";
    toast.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
    toast.style.zIndex = 1000;

    document.body.appendChild(toast);

    setTimeout(() => {
        document.body.removeChild(toast);
    }, 3000); // Automatically remove after 3 seconds
}