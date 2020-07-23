import {RECEIVE_NEW_USER} from '../actions/appearance_actions';

const appearancesReducer = (defaultState = {}, action) => {

    Object.freeze(defaultState);

    switch (action.type) {
        case RECEIVE_NEW_USER:
            return Object.assign({}, defaultState, {[action.user.id]: action.user});
        default:
            return defaultState;
    }
}

export default appearancesReducer;