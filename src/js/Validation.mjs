// src/js/Validation.mjs - (Updated Code with 'signup' type)

export default class Validation {
    constructor(formElement) {
        this.form = formElement;
        this.errors = {};
    }

    clearErrors() {
        const errorElements = this.form.querySelectorAll(".alert");
        errorElements.forEach(el => {
            el.textContent = "";
        });
        this.errors = {};
    }

    displayErrors() {
        for (const [key, value] of Object.entries(this.errors)) {
            const errorElement = document.getElementById(`${key}-error`);
            if (errorElement) {
                errorElement.textContent = value;
            }
        }
    }

    isEmpty(value) {
        return value.trim() === "";
    }

    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    validateExpiration(expiration) {
        const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        return regex.test(expiration);
    }

    /**
     * The main validation entry point. Runs checks based on the validation type.
     * @param {string} type - 'checkout' or 'signup'
     * @returns {boolean} - True if all validation passes.
     */
    validate(type = 'checkout') {
        this.clearErrors();

        const form = this.form;
        let isValid = true;

        const requiredFields = (type === 'signup')
            ? ["name", "email", "password", "address", "city", "state", "zip"]
            : ["fname", "lname", "street", "city", "state", "zip", "cardNumber", "expiration", "code"];

        // --- Required Field Checks ---
        requiredFields.forEach(fieldName => {
            const input = form.elements[fieldName];
            if (!input || this.isEmpty(input.value)) {
                this.errors[fieldName] = "This field is required.";
                isValid = false;
            }
        });

        // --- Signup Specific Checks ---
        if (type === 'signup') {
            // Email Format Check
            if (!this.errors.email && !this.validateEmail(form.elements.email.value)) {
                this.errors.email = "Please enter a valid email address.";
                isValid = false;
            }
            // Password Length Check (Must be 8 characters)
            if (!this.errors.password && form.elements.password.value.length < 8) {
                this.errors.password = "Password must be at least 8 characters.";
                isValid = false;
            }
            // Zip Code Length Check
            if (!this.errors.zip && form.elements.zip.value.length !== 5) {
                this.errors.zip = "Zip code must be 5 digits.";
                isValid = false;
            }
        }

        // --- Checkout Specific Checks (Existing Logic) ---
        if (type === 'checkout') {
            // Zip Code
            if (!this.errors.zip && form.elements.zip.value.length !== 5) {
                this.errors.zip = "Zip code must be 5 digits.";
                isValid = false;
            }
            // Card Number
            if (!this.errors.cardNumber && form.elements.cardNumber.value.replace(/\D/g, '').length !== 16) {
                this.errors.cardNumber = "Card number must be 16 digits.";
                isValid = false;
            }
            // CVV Code
            if (!this.errors.code && form.elements.code.value.length !== 3) {
                this.errors.code = "CVV must be 3 digits.";
                isValid = false;
            }
            // Expiration Date
            const expirationValue = form.elements.expiration.value;
            if (!this.errors.expiration && !this.validateExpiration(expirationValue)) {
                this.errors.expiration = "Format must be MM/YY.";
                isValid = false;
            }
        }

        if (!isValid) {
            this.displayErrors();
        }

        return isValid;
    }
}