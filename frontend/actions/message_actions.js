import {
    getMessages,
    postMessage,
    patchMessage,
    deleteMessage
} from '../util/message';

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveMessages = (messages) => {
    return {
        type: RECEIVE_MESSAGES,
        messages
    }
}

export const receieveMessage = (message) => {
    return {
        type: RECEIVE_MESSAGE,
        message
    }
}

export const receiveErrors = (errors) => {
    return {
        type: RECEIVE_ERRORS,
        errors
    }
}

export const postMessage = (message) => {
    return {
        type: RECEIVE_MESSAGE,
        message
    }
}

export const createMessage = (message) => dispatch => (
    postMessage(message).then(message => (
    dispatch(receieveMessage(message))
)));
