import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import Validation from "./Validation.mjs"; // <--- NEW: Import the Validation class

const services = new ExternalServices();

function formDataToJSON(formElement) {
    // convert the form data to a JSON object
    const formData = new FormData(formElement);
    const convertedJSON = {};
    formData.forEach((value, key) => {
        convertedJSON[key] = value;
    });
    return convertedJSON;
}

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        console.log(item);
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: 1,
        };
    });
    return simplifiedItems;
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        // calculate and display the total amount of the items in the cart, and the number of items.
        const summaryElement = document.querySelector(
            this.outputSelector + " #cartTotal"
        );
        const itemNumElement = document.querySelector(
            this.outputSelector + " #num-items"
        );
        itemNumElement.innerText = this.list.length;
        // calculate the total of all the items in the cart
        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        summaryElement.innerText = `$${this.itemTotal}`;
    }

    calculateOrderTotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        this.tax = this.itemTotal * 0.06;
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.orderTotal =
            parseFloat(this.itemTotal) +
            parseFloat(this.tax) +
            parseFloat(this.shipping);
        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        const shipping = document.querySelector(`${this.outputSelector} #shipping`);
        const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);

        tax.innerText = `$${this.tax.toFixed(2)}`;
        shipping.innerText = `$${this.shipping.toFixed(2)}`;
        orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
    }

    // <--- NEW METHOD: For displaying general errors (mainly server errors) --->
    displayErrors(errorList) {
        const errorElement = document.querySelector("#checkout-errors"); // Assuming index.html has an element with this ID
        if (errorElement) {
            // Clear previous errors
            errorElement.innerHTML = "";

            // Construct and display the list of error messages
            const htmlItems = errorList.map(item => `<li>${item}</li>`).join("");
            errorElement.innerHTML = `<h3>⚠️ Order Failed</h3><ul class="alert-list">${htmlItems}</ul>`;
            errorElement.classList.remove("hide");
            errorElement.focus(); // Good practice to move focus to the error area
        }
    }
    // <--- END NEW METHOD --->

    async checkout() {
        // Clear previous general errors before starting
        const errorElement = document.querySelector("#checkout-errors");
        if (errorElement) errorElement.innerHTML = "";

        const formElement = document.forms["checkout"];

        // 1. CLIENT-SIDE VALIDATION
        const validator = new Validation(formElement);
        // The validator will internally handle clearing and displaying field-specific errors
        if (!validator.validate()) {
            console.log("Client-side validation failed.");
            return; // STOP: Do not proceed to server if client validation fails
        }

        // 2. BUILD ORDER PAYLOAD (Only if validation passes)
        const order = formDataToJSON(formElement);

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageItems(this.list);

        // 3. ATTEMPT CHECKOUT AND HANDLE SERVER ERRORS
        try {
            const response = await services.checkout(order);
            console.log(response);

            // On successful order:
            localStorage.removeItem(this.key); // Clear the cart (assuming 'this.key' is the cart storage key)
            // Redirect to a success page
            window.location.assign("../success.html");

        } catch (err) {
            // 4. SERVER ERROR HANDLING
            console.error("Server Error:", err);

            // The error message from ExternalServices.mjs now contains the server's JSON payload string.
            // We must parse it back into a JavaScript object.
            const serverResponse = JSON.parse(err.message);
            const errorMessages = [];

            // A typical server error may have a general message and a detailed 'errors' object.
            if (serverResponse.message) {
                errorMessages.push(serverResponse.message);
            }

            // Iterate over any field-specific errors the server returned.
            if (serverResponse.errors) {
                for (const [key, value] of Object.entries(serverResponse.errors)) {
                    // Display both the field and the error message
                    errorMessages.push(`${key}: ${value}`);
                }
            }

            // Fallback for unexpected errors
            if (errorMessages.length === 0) {
                errorMessages.push("An unknown error occurred during checkout. Please try again.");
            }

            // Display all aggregated server errors in the general error area
            this.displayErrors(errorMessages);
        }
    }
}