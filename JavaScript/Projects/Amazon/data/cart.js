// Exporting variable
export const cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', // Normalising data as prodcuctID is primary key
    quantity: 2
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
},
];

// Add to cart function
export function addToCart(productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    // Increment total if already in cart
    if (matchingItem) {
        matchingItem.quantity ++;
    } else {
        cart.push({
        productId: productId,
        quantity: 1
    });
    };

}