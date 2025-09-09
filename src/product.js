import { getParam } from './utils.mjs';
import ProductData from './js/ProductData.mjs';

const dataSource = new ProductData('tents');
const productId = getParam('product');

// This will print the product data object in the console
console.log(dataSource.findProductById(productId));