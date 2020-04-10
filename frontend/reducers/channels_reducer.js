import {
    RECEIVE_CHANNELS,
    RECEIVE_CHANNEL,
    REMOVE_CHANNEL
} from '../util/channel_util';

const channelsReducer = (defaultState = {}, action) => {

    Object.freeze(defaultState);

    switch (action.type) {
        case RECEIVE_CHANNELS:
            return action.channels;
        case RECEIVE_CHANNEL:
            return Object.assign({}, defaultState, {[action.channel.id]: action.channel})
        case REMOVE_CHANNEL:
            let nextState = Object.assign({}, defaultState);
            delete nextState[action.channel.id];
            return nextState;
        default:
            return defaultState;
    }
}

export default channelsReducer;