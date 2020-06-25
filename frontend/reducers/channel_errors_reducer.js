import { RECEIVE_ERRORS } from '../actions/channel_actions';

const channelErrorsReducer = (defaultState = [], action) => {

    Object.freeze(defaultState);

    switch (action.type) {
        case RECEIVE_ERRORS:
            return action.errors;
        default:
            return defaultState;
    }
}

export default channelErrorsReducer;