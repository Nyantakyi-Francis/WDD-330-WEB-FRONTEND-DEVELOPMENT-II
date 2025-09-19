import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData();

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.id}">
        <img
            src="${product.images.image1}"
            alt="Image of ${product.name}"
        />
        <h3 class="card__brand">${product.brand.name}</h3>
        <h2 class="card__name">${product.nameWithoutBrand}</h2>
        <p class="product-card__price">$${product.finalPrice}</p>
    </a>
</li>`;
}

async function renderListWithTemplates() {
    const category = getParam('category');
    const productListElement = document.querySelector('.product-list');
    const products = await dataSource.getData(category);

    const htmlItems = products.map(product => productCardTemplate(product));
    productListElement.innerHTML = htmlItems.join('');

    // Update the title to show the category name
    const titleElement = document.querySelector('.products h2');
    titleElement.textContent = `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
}

renderListWithTemplates();