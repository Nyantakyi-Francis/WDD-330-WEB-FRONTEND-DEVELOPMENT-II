// In src/ProductList.mjs

import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/index.html?product=${product.id}">
        <img src="${product.image}" alt="${product.name} image">
        <h3 class="card__brand">${product.brand.name}</h3>
        <h2 class="card__name">${product.name}</h2>
        <p class="product-card__price">$${product.finalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}