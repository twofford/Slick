import {RECEIVE_NEW_USER} from '../actions/appearance_actions';
import {LOGOUT_CURRENT_USER} from '../actions/session_actions';

const appearancesReducer = (defaultState = {}, action) => {

    Object.freeze(defaultState);

    switch (action.type) {
        case RECEIVE_NEW_USER:
            return Object.assign({}, defaultState, {[action.user.id]: action.user});
        case LOGOUT_CURRENT_USER:
            //remove the current user from the appearances slice of state
        default:
            return defaultState;
    }
}

export default appearancesReducer;