// src/js/ProductList.mjs


function productCardTemplate(product) {
    // Correct URL for the detail page. Assumes /product_pages/ and product details use 'id'
    const productUrl = `/product_pages/index.html?product=${product.Id}`;

    return `<li class="product-card">
        <a href="${productUrl}">
            <img 
                src="${product.Images.PrimaryMedium}" 
                alt="Image of ${product.Name}"
            />
            <h3 class="card__name">${product.Brand.Name}</h3>
            <h4 class="card__name">${product.NameWithoutBrand}</h4>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement = '.product-list') {
        this.category = category;
        this.dataSource = dataSource;
        this.listElementSelector = listElement; // Set to '.product-list' by default
    }

    /**
     * Initializes the product list by fetching the data and rendering it.
     */
    async init() {
        // Fetch the product data from the ExternalServices (dataSource)
        const list = await this.dataSource.getData(this.category);

        // Render the list to the HTML
        this.renderList(list);

        // Update the header title
        this.setPageTitle(this.category);
    }

    /**
     * Updates the text of the h2 on the listing page.
     * @param {string} category - The product category to display in the title.
     */
    setPageTitle(category) {
        // Find the title element using the structure from index.html
        const titleElement = document.querySelector('.products h2 .highlight');

        if (titleElement) {
            // Capitalize the first letter of the category name
            const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
            titleElement.textContent = capitalizedCategory;
        }
    }

    /**
     * Renders the array of product objects into HTML and inserts it into the DOM.
     * @param {Array} list - The list of product objects (Result array from API).
     */
    renderList(list) {
        const holder = document.querySelector(this.listElementSelector);

        if (!holder) {
            console.error(`List element selector '${this.listElementSelector}' not found.`);
            return;
        }

        // Generate and insert the HTML for each product card
        const html = list.map(productCardTemplate).join('');

        // Use innerHTML to replace the content of the <ul> container
        holder.innerHTML = html;
    }
}