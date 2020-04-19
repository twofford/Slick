import {
    RECEIVE_MESSAGES,
    RECEIVE_MESSAGE,
    REMOVE_MESSAGE
} from '../actions/message_actions';

const messagesReducer = (defaultState = false, action) => {

    // debugger

    Object.freeze(defaultState);

    switch (action.type) {
        case RECEIVE_MESSAGES:
            return action.messages;
        case RECEIVE_MESSAGE:
            return Object.assign({}, defaultState, {[action.message.id]: action.message})
        // case REMOVE_MESSAGE:
        //     let nextState = Object.assign({}, defaultState);
        //     delete nextState[action.message.id];
        //     return nextState;
        default:
            return defaultState;
    }
}

export default messagesReducer;