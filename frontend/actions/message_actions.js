//AJAX REQUESTS//

import * as MessageApiUtil from '../util/message';
//

//TYPE CONSTANTS//

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const RECEIVE_MESSAGE_ERRORS = 'RECEIVE_MESSAGE_ERRORS';

//

//REGULAR ACTION CREATORS//

export const receiveMessages = (messages) => {
    return {
        type: RECEIVE_MESSAGES,
        messages
    }
}

export const receiveMessage = (message) => {
    return {
        type: RECEIVE_MESSAGE,
        message
    }
}

export const receiveErrors = (errors) => {
    return {
        type: RECEIVE_MESSAGE_ERRORS,
        errors
    }
}

//THUNK ACTION CREATORS

export const fetchMessages = (channelId) => dispatch => (
    MessageApiUtil.getMessages(channelId).then(messages => (dispatch(receiveMessages(messages)))));

// export const fetchMessage = (message) => dispatch => (
//     MessageApiUtil.getMessage(message).then(message => (dispatch(receiveMessage(message)))));

export const createMessage = (message) => {
    return dispatch => MessageApiUtil.postMessage(message)
    .then(message => dispatch(receiveMessage(message)))
};

export const updateMessage = (message) => dispatch => (
    MessageApiUtil.patchMessage(message).then(message => (
        dispatch(receiveMessage(message))
    )));

//