import {
    RECEIVE_CURRENT_USER,
    LOGOUT_CURRENT_USER
} from "../actions/session_actions";

const _nullSession = {
    user: null
};

const sessionReducer = (defaultState = _nullSession, action) => {
    
    Object.freeze(defaultState);

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, {user: action.user})
        case LOGOUT_CURRENT_USER:
            return _nullSession;  
        default:
            return defaultState;
    }
};

export default sessionReducer;