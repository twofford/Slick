import {combineReducers} from 'redux';

import sessionErrorsReducer from './session_errors_reducer';
import userErrorsReducer from './user_errors_reducer';
import channelErrorsReducer from './channel_errors_reducer';

const errorsReducer = combineReducers({
    session: sessionErrorsReducer,
    user: userErrorsReducer,
    channel: channelErrorsReducer
})

export default errorsReducer;