import {RECEIVE_CURRENT_USER, RECEIVE_ERRORS} from '../actions/session_actions';

const userErrorsReducer = (defaultState = [], action) => {

    Object.freeze(defaultState);

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
        return [];
        case RECEIVE_ERRORS:
            return action.errors;
        default:
            return defaultState;
    }
}

export default userErrorsReducer;