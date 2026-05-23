import {formatCurrency} from "../../scripts/utils/money.js";

// Automated tests
// Test suite - Group of related tests
console.log('Test suite: formatCurrency')

// Basic Test Case

console.log('Tests converting cents into dollars')
if (formatCurrency(2095) === '20.95') {
    console.log('passed'); 
} else {
    console.log('failed');
}

// Edge Cases
console.log('Tests with 0 value')
if (formatCurrency(0) === '0.00') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('Tests round method to round up to nearest cent')
if (formatCurrency(2000.5) === '20.01') {
    console.log('passed')
} else {
    console.log('failed')
}