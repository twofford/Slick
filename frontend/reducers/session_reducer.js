import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
} from "../actions/session_actions";

const _nullSession = {
  user: {},
};

const sessionReducer = (defaultState = _nullSession, action) => {
  Object.freeze(defaultState);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign(
        {},
        { user: { ...defaultState.user, ...action.user } }
      );
    case LOGOUT_CURRENT_USER:
      const nextState = { ...defaultState };
      delete nextState.user.id;
      delete nextState.user.email;
      return nextState;
    default:
      return defaultState;
  }
};

export default sessionReducer;
