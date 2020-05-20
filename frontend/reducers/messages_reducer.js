import {
    RECEIVE_MESSAGES,
    RECEIVE_MESSAGE,
    REMOVE_MESSAGE
} from '../actions/message_actions';

const messagesReducer = (defaultState = false, action) => {

    Object.freeze(defaultState);

    switch (action.type) {
        case RECEIVE_MESSAGES:
            // debugger
            return action.messages;
        case RECEIVE_MESSAGE:
            // debugger
            return Object.assign({}, defaultState, action.message)
        default:
            // debugger
            return defaultState;
    }
}

export default messagesReducer;