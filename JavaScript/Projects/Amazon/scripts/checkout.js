import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
// import'../data/cart-class.js';

//import '../data/backend-practice.js';
import {loadProducts, loadProductsFetch} from "../data/products.js";
import {loadCart} from "../data/cart.js";

// async makes a function return a promise
// await lets us wait for a promise to finish before going to the next line, can only be used in async function
async function loadPage() { // shortcut for promise
    await loadProductsFetch(); // shortcut for then

    await new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

    renderOrderSummary();
    renderPaymentSummary()

}
loadPage();

// Promises let us split code into seperate steps & a better way to run asynchronous code then nesting
Promise.all([ // Runs multiple promises at the same time
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })

]).then((values) => { // Above values
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary()
});

/*
Alternative way without .all([])
// Promises let us split code into seperate steps & allows JS to do multiple things at same time
new Promise((resolve) => { // Creates promise object - work that will finish later
    loadProducts(() => {
        resolve('value1'); // resolve marks promise as successful and goes to next step
    }); // The value given to resolve will be saved in the then parameter

}).then((value) => { // then represents the next step
    console.log(value)
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

}).then(() => {
    renderOrderSummary();
    renderPaymentSummary()
})

// Multiple callbacks cause lots of nesting, therefore promises are more efficient
loadProducts(() => {
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary()
    }); 
})
*/