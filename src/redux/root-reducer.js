import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

//Local storage on the browser. 
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReduer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
};

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReduer,
    shop: shopReducer
});

// This will turn this into Redux Giant Object {Root Reducer Object}.
export default persistReducer(persistConfig, rootReducer);