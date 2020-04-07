import {
    RECEIVE_CURRENT_USER,
    LOGOUT_CURRENT_USER
} from "../actions/session";

const _nullSession = {
    currentUser: null
};

const sessionReducer = (defaultState = _nullSession, action) => {
    
    Object.freeze(_nullSession);

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, {currentUser: action.user})
        case LOGOUT_CURRENT_USER:
            return _nullSession;  
        default:
            return defaultState;
    }
};

export default sessionReducer;