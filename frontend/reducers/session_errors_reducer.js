import {RECEIVE_CURRENT_USER, RECEIVE_ERRORS} from '../actions/session';

const sessionErrorsReducer = (defaultState = [], action) => {

    Object.freeze(defaultState);

    // debugger

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return [];
        case RECEIVE_ERRORS:
            // debugger
            return action.errors;
        default:
            return defaultState;
    }
}

export default sessionErrorsReducer;