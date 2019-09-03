import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';

// This will turn this into Redux Giant Object {Root Reducer Object}.
export default combineReducers({
    user: userReducer
});