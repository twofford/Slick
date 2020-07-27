import {RECEIVE_CURRENT_USER} from '../actions/session_actions';
import { RECEIVE_USERS, RECEIVE_USER } from "../actions/user_actions";

const usersReducer = (defaultState = {}, action) => {

    Object.freeze(defaultState);

    switch (action.type) {
        case RECEIVE_USERS:
            return Object.assign({}, action.users, defaultState);
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, defaultState, {[action.user.id]: action.user});
        case RECEIVE_USER:
            return Object.assign({}, defaultState, {[action.user.id]: action.user})
        default:
            return defaultState;
    }
};

export default usersReducer;