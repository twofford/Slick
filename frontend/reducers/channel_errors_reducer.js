import {
  RECEIVE_CHANNEL_ERRORS,
  CLEAR_CHANNEL_ERRORS,
} from "../actions/channel_actions";

const channelErrorsReducer = (defaultState = [], action) => {
  Object.freeze(defaultState);

  switch (action.type) {
    case RECEIVE_CHANNEL_ERRORS:
      return action.errors;
    case CLEAR_CHANNEL_ERRORS:
      return [];
    default:
      return defaultState;
  }
};

export default channelErrorsReducer;
