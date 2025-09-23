import { loadHeaderFooter, qs } from "./utils.mjs";

// Load the header and footer into the page
loadHeaderFooter();

// Newsletter form functionality
document.addEventListener("DOMContentLoaded", () => {
    const newsletterForm = qs("#newsletter-form");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const emailInput = qs("#email-input");
            const messageBox = qs("#messageBox");
            const email = emailInput.value.trim();

            if (email) {
                messageBox.textContent = `Thank you for signing up, ${email}!`;
                messageBox.classList.remove("hidden", "bg-red-100", "text-red-700");
                messageBox.classList.add("bg-green-100", "text-green-700");
                emailInput.value = "";
            } else {
                messageBox.textContent = "Please enter a valid email address.";
                messageBox.classList.remove("hidden", "bg-green-100", "text-green-700");
                messageBox.classList.add("bg-red-100", "text-red-700");
            }
        });
    }
});
