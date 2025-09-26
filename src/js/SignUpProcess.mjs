// src/js/SignUpProcess.mjs
import { formDataToJSON, setLocalStorage } from "./utils.mjs";
import Validation from "./Validation.mjs";

export default class SignUpProcess {
    constructor(formSelector, messageSelector) {
        this.formElement = document.querySelector(formSelector);
        this.messageElement = document.querySelector(messageSelector);
    }

    // Displays general messages (success/error) in the dedicated message box.
    displayMessage(message, isError = false) {
        this.messageElement.innerHTML = message;
        this.messageElement.classList.remove('hide', 'alert-box-success', 'alert-box-error');

        if (isError) {
            this.messageElement.classList.add('alert-box-error');
        } else {
            this.messageElement.classList.add('alert-box-success');
        }
    }

    // Clears any previous message in the box.
    clearMessages() {
        this.messageElement.innerHTML = "";
        this.messageElement.classList.add('hide');
        this.messageElement.classList.remove('alert-box-error', 'alert-box-success');
    }

    async signUp() {
        this.clearMessages();

        // 1. Client-Side Validation
        const validator = new Validation(this.formElement);
        // We pass 'signup' to trigger the specific validation rules we defined
        if (!validator.validate('signup')) {
            this.displayMessage("Please correct the errors in the form.", true);
            return;
        }

        // 2. Gather Data
        const userData = formDataToJSON(this.formElement);

        // --- Simulated Successful Registration Logic ---
        // Store a small profile locally to confirm success
        const userProfile = {
            name: userData.name,
            email: userData.email,
            address: `${userData.address}, ${userData.city}, ${userData.state} ${userData.zip}`,
            registered: new Date().toISOString()
        };

        setLocalStorage("userProfile", userProfile);

        // 3. Display Success Message
        const successMessage = `
            <h3>🥳 Success! Welcome, ${userData.name}!</h3>
            <p>Your account has been successfully created.</p>
        `;
        this.displayMessage(successMessage, false);

        // Optional: Reset the form fields
        this.formElement.reset();
    }
}