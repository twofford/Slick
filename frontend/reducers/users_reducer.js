import {RECEIVE_CURRENT_USER} from '../actions/session';

const usersReducer = (defaultState = {}, action) => {

    Object.freeze(defaultState);

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            
            return Object.assign({}, defaultState, {[action.user.id]: action.user});
        default:
            return defaultState;
    }
};

export default usersReducer;