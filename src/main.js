import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const dataSource = new ProductData('tents');
const listElement = document.querySelector('.product-list');

const productList = new ProductList('tents', dataSource, listElement);
productList.init();


document.getElementById('newsletter-form').addEventListener('submit', (event) => {
    // Prevent the default form submission that reloads the page
    event.preventDefault();

    // Get the email input element
    const emailInput = document.getElementById('email-input');
    const email = emailInput.value;

    // Log the email to the console to confirm it works
    console.log('Newsletter sign-up received for:', email);

    // Create a new element to display the message
    const messageContainer = document.createElement('div');
    messageContainer.textContent = `Thank you for signing up, ${email}!`;
    messageContainer.className = 'bg-green-100 text-green-800 p-3 rounded-md mt-4 text-center';

    // Get the parent container to append the message to
    const form = document.getElementById('newsletter-form');
    form.parentNode.insertBefore(messageContainer, form.nextSibling);

    // Clear the input field after submission
    emailInput.value = '';

    // Remove the message after a few seconds
    setTimeout(() => {
        messageContainer.remove();
    }, 5000); // 5 seconds
});
