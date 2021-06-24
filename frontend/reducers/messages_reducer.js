import {
  RECEIVE_MESSAGES,
  RECEIVE_MESSAGE,
  REMOVE_MESSAGE,
} from "../actions/message_actions";

const messagesReducer = (defaultState = false, action) => {
  Object.freeze(defaultState);

  switch (action.type) {
    case RECEIVE_MESSAGES:
      return action.messages;
    case RECEIVE_MESSAGE:
      return Object.assign({}, defaultState, action.message);
    default:
      return defaultState;
  }
};

export default messagesReducer;
