import CartActionTypes from './cart.types';
import { addItemToCart } from './cart.utils';


const INITIAL_STATE = {
    hidden: true,
    cartItems: []
}

// The reducer listen for the cases of new actions types

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case CartActionTypes.TOGGLE_CART_HIDDEN:
        return {
          ...state,
          hidden: !state.hidden
        };
      
      case CartActionTypes.ADD_ITEM:
        return {
          ...state,
          // We return a new array except we append the new item that we get as a payload.
          cartItems: addItemToCart(state.cartItems, action.payload)
        }

      default:
        return state;
    }
}

export default cartReducer;