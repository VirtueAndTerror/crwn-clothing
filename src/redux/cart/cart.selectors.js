//Reselect.js library contains memoized funtions we are going to use.
import { createSelector } from 'reselect';


// This going to pull the cart from the state.
const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],  
//the callback is called only when something in the array of inputs changes thanks to relect.js.
    cart => cart.cartItems

);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => 
        cartItems.reduce(
            (accumulatedQuantity, cartItem) => 
            accumulatedQuantity + cartItem.quantity,
            0
        )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
     cartItems => 
        cartItems.reduce(
            (accumulatedQuantity, cartItem) => 
            accumulatedQuantity + cartItem.quantity * cartItem.price,
            0
        )
);