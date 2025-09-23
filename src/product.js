import { getParam } from './utils.mjs';
import ExternalServices from './js/ExternalServices.mjs';

function productTemplate(product) {
    return `
    <h3 id="productBrand">${product.brand.name}</h3>
    <h2 id="productName" class="divider">${product.nameWithoutBrand}</h2>
    <div class="product-color-options"></div>
    <img id="productImage" class="divider" src="${product.images.image1}" alt="${product.name}" />
    <p id="productPrice" class="product-card__price">$${product.finalPrice}</p>
    <p id="productColor" class="product__color">${product.colorHtml}</p>
    <p id="productDescription" class="product__description">${product.descriptionHtmlSimple}</p>
    <div class="product-detail__add">
        <button id="addToCart" data-id="${product.id}">Add to Cart</button>
    </div>`;
}

class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails(this.product);
        document.getElementById('addToCart').addEventListener('click', this.addToCart.bind(this));
    }

    renderProductDetails(product) {
        const productDetailSection = document.querySelector('.product-detail');
        productDetailSection.innerHTML = productTemplate(product);

        // Logic for rendering color swatches
        if (this.product.colorOptions) {
            const colorsContainer = document.querySelector('.product-color-options');
            let html = '';
            this.product.colorOptions.forEach(color => {
                html += `<span class="product-color-swatch" style="background-color: ${color.colorCode};" data-color="${color.colorName}"></span>`;
            });
            colorsContainer.innerHTML = html;

            // Event listener to handle clicks on the swatches
            colorsContainer.addEventListener('click', (e) => {
                const selectedColor = e.target.dataset.color;
                console.log(`Selected color: ${selectedColor}`);
                // Additional logic could go here to update the main product image based on the selected color
            });
        }
    }

    addToCart() {
        // Simple function to add the product to the cart
        console.log(`Adding ${this.product.nameWithoutBrand} to cart.`);
    }
}

const dataSource = new ExternalServices('tents');
const productId = getParam('product');
const product = new ProductDetails(productId, dataSource);
product.init();