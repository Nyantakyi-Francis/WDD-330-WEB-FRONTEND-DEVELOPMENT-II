import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const emailInput = document.getElementById('email-input');
            const email = emailInput.value;
            const messageBox = document.getElementById('messageBox');

            if (email) {
                messageBox.textContent = `Thank you for signing up, ${email}!`;
                messageBox.classList.remove('hidden');
                messageBox.classList.remove('bg-red-100', 'text-red-700');
                messageBox.classList.add('bg-green-100', 'text-green-700');
                emailInput.value = '';
            } else {
                messageBox.textContent = 'Please enter a valid email address.';
                messageBox.classList.remove('hidden');
                messageBox.classList.remove('bg-green-100', 'text-green-700');
                messageBox.classList.add('bg-red-100', 'text-red-700');
            }
        });
    }
});
