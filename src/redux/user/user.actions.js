import { UserActionTypes } from './user.types';


// This is the structure of an action-object: {type:<data>, payload: <data>}

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});