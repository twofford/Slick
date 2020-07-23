import {combineReducers} from 'redux';

import usersReducer from './users_reducer';
import channelsReducer from './channels_reducer';
import messagesReducer from './messages_reducer';
import appearancesReducer from './appearances_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    appearances: appearancesReducer
});

export default entitiesReducer;