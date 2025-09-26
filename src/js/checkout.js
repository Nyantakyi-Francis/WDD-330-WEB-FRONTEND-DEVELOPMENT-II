import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs"; // Changed import to use default export

loadHeaderFooter();

const myCheckoutProcess = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckoutProcess.init();

// Add event listeners to fire calculateOrderTotal when the user changes the zip code
document
  .querySelector("#zip")
  .addEventListener(
    "blur",
    myCheckoutProcess.calculateOrderTotal.bind(myCheckoutProcess),
  );

// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  const chkout = myForm.checkValidity();
  myForm.reportValidity();
  if (chkout) {
    myCheckoutProcess.checkout();
  }
});
