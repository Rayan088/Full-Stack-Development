import {formatCurrency} from "../scripts/utils/money.js";

export function getProduct(productId) {
  let matchingProduct;

      products.forEach((product) => {
          if (product.id === productId) {
              matchingProduct = product;
          }
      });

      return matchingProduct;
}

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsURL() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`
  }

  extraInfoHTML() {
    return "";
  }
}

class Clothing extends Product{ //Clothing inherits from Product
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails); // Calls parent constructor
    this.sizeChartLink = productDetails.sizeChartLink; // New attribute
  }

  extraInfoHTML() { // Method overriding parent method
    return `
      <a href="${this.sizeChartLink}" target="_blank">Size chart</a>
    `;
  }
}


const date = new Date(); // Built in class
console.log(date); // Current date
console.log(date.toLocaleTimeString()) // Current time

// this
console.log(this); // this displays as undefined outside classes

function logThis() {
  console.log(this);
}

logThis(); // displays undefined
logThis.call('hello'); // call replaces the code in this

// arrow functions do not change the value of this and points to the outer object
const object3 = {
  method: () => {
    console.log(this);
  }
};
object3.method();


export let products = []

// Better way to make http request with fetch and promises
export function loadProductsFetch() {
  const promise = fetch('https:/supersimplebackend.dev/products').then((response) => { // fetch makes http GET request and stores response
    return response.json() // Gives json of data to response, When returned it waits for it to finish before proceeding
  }).then((productsData) => {
    products = productsData.map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });

    console.log('load products')
  }).catch(() => { // catch for errors in promises
    console.log('Unexpected error. Please try again later.');
  });

  return promise;
}

/*
loadProductsFetch().then(() => {
  console.log('Next step')
});
*/

// Loads product data from backend and converts into JS object
export function loadProducts(fun) { // Callback to run in the future
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });

    console.log('load products')

    fun();
  })

  // Event Listener for error handling
  xhr.addEventListener('error', (error) => {
    console.log('Unexpected error. Please try again later.')
  })

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}