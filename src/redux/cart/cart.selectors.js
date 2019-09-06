import { createSelector } from 'reselect';


// This going to pull the cart from the state.
const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems

);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => 
        cartItems.reduce(
            (accumulatedQuantity, cartItems) => 
            accumulatedQuantity + cartItems.quantity,
            0
        )
);