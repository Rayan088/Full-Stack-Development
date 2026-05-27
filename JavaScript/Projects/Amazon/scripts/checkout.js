import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
// import'../data/cart-class.js';

//import '../data/backend-practice.js';
import {loadProducts} from "../data/products.js";
import {loadCart} from "../data/cart.js";

// Promises let us split code into seperate steps & a better way to run asynchronous code then nesting
Promise.all([ // Runs multiple promises at the same time
    new Promise((resolve) => { // Creates promise object - work that will finish later
        loadProducts(() => {
            resolve('value1'); // resolve marks promise as successful and goes to next step
        }); // The value given to resolve will be saved in the then parameter
    }),
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