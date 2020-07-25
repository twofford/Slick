import {RECEIVE_NEW_USER} from '../actions/appearance_actions';
import {LOGOUT_NEW_USER} from '../actions/appearance_actions';

const appearancesReducer = (defaultState = {}, action) => {

    Object.freeze(defaultState);

    switch (action.type) {
        case RECEIVE_NEW_USER:
            return Object.assign({}, defaultState, {[action.user.id]: action.user});
        case LOGOUT_NEW_USER:
            const nextState = {...defaultState};
            delete nextState[action.user.id];
            return nextState;
        default:
            return defaultState;
    }
}

export default appearancesReducer;