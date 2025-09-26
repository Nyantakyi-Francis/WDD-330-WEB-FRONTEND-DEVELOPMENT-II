// src/js/utils.mjs (FINAL WORKING VERSION)

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// remove a key entirely from local storage
export function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback(event);
  });
  qs(selector).addEventListener("click", callback);
}

// helper to get form data and convert it into an object
export function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  return Object.fromEntries(formData.entries());
}

// load header and footer dynamically into each page
export async function loadHeaderFooter() {
  try {
    // --- UPDATED RELATIVE PATHS ---
    // load header
    const header = await fetch("../partials/header.html");
    const headerContent = await header.text();
    qs("header").innerHTML = headerContent;

    // load footer
    const footer = await fetch("../partials/footer.html");
    const footerContent = await footer.text();
    qs("footer").innerHTML = footerContent;
    // ------------------------------
  } catch (err) {
    console.error("Error loading header/footer:", err);
  }
}