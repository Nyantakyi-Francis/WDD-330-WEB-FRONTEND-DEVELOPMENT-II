// src/js/signup.js
import { loadHeaderFooter } from "./utils.mjs";
import SignUpProcess from "./SignUpProcess.mjs";

loadHeaderFooter();

// Initialize the sign-up process
const signUpProcess = new SignUpProcess("form[name='signup']", "#signup-message");

// Add event listener for form submission
document.querySelector("#signupSubmit").addEventListener("click", (e) => {
    e.preventDefault();

    // Explicitly call the checkValidity on the form for native browser feedback
    const formElement = document.forms.signup;

    // If native HTML validation passes, run our custom validation and sign-up logic
    if (formElement.checkValidity()) {
        signUpProcess.signUp();
    }
    // Also call reportValidity() to show native errors if client-side validation fails before the submit is attempted
    formElement.reportValidity();
});