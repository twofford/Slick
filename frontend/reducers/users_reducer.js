import {RECEIVE_CURRENT_USER} from '../actions/session_actions';
import {RECEIVE_USERS} from '../actions/user_actions';

const usersReducer = (defaultState = {}, action) => {

    debugger

    Object.freeze(defaultState);

    switch (action.type) {
        case RECEIVE_USERS:
            return action.users;
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, defaultState, {[action.user.id]: action.user});
        default:
            return defaultState;
    }
};

export default usersReducer;