// src/js/Validation.mjs

export default class Validation {
    constructor(formElement) {
        this.form = formElement;
        this.errors = {}; // Object to hold error messages (key: input name, value: message)
    }

    /**
     * Clears all previously displayed field-specific error messages.
     * This ensures only current errors are visible.
     */
    clearErrors() {
        const errorElements = this.form.querySelectorAll(".alert");
        errorElements.forEach(el => {
            el.textContent = "";
        });
        this.errors = {}; // Reset the internal error tracking object
    }

    /**
     * Displays error messages stored in this.errors next to their respective fields.
     */
    displayErrors() {
        for (const [key, value] of Object.entries(this.errors)) {
            const errorElement = document.getElementById(`${key}-error`);
            if (errorElement) {
                errorElement.textContent = value;
            }
        }
    }

    /**
     * Checks if a field's value is empty.
     * @param {string} value - The value of the form field.
     * @returns {boolean} - True if empty, false otherwise.
     */
    isEmpty(value) {
        return value.trim() === "";
    }

    /**
     * Validates the structure of the credit card expiration date (MM/YY).
     * @param {string} expiration - The expiration string from the input.
     * @returns {boolean} - True if format is valid (MM/YY), false otherwise.
     */
    validateExpiration(expiration) {
        // Regex for MM/YY format: two digits / two digits
        const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        return regex.test(expiration);
    }

    /**
     * The main validation entry point. Runs all checks.
     * @returns {boolean} - True if all validation passes, false otherwise.
     */
    validate() {
        this.clearErrors(); // 1. Always start by clearing old errors

        const form = this.form;
        let isValid = true;

        // --- Required Field Checks ---
        const requiredFields = [
            "fname", "lname", "street", "city", "state", "zip",
            "cardNumber", "expiration", "code"
        ];

        requiredFields.forEach(fieldName => {
            const input = form.elements[fieldName];
            if (this.isEmpty(input.value)) {
                this.errors[fieldName] = "This field is required.";
                isValid = false;
            }
        });

        // --- Format/Length Checks (Only if not empty) ---

        // 1. Zip Code: Must be 5 digits
        if (!this.errors.zip && form.elements.zip.value.length !== 5) {
            this.errors.zip = "Zip code must be 5 digits.";
            isValid = false;
        }

        // 2. Card Number: Must be 16 digits
        if (!this.errors.cardNumber && form.elements.cardNumber.value.replace(/\D/g, '').length !== 16) {
            this.errors.cardNumber = "Card number must be 16 digits.";
            isValid = false;
        }

        // 3. CVV Code: Must be 3 digits
        if (!this.errors.code && form.elements.code.value.length !== 3) {
            this.errors.code = "CVV must be 3 digits.";
            isValid = false;
        }

        // 4. Expiration Date: Must be MM/YY format
        const expirationValue = form.elements.expiration.value;
        if (!this.errors.expiration && !this.validateExpiration(expirationValue)) {
            this.errors.expiration = "Format must be MM/YY.";
            isValid = false;
        }

        // --- End of Checks ---

        if (!isValid) {
            this.displayErrors(); // 2. Display all collected errors
        }

        return isValid;
    }
}