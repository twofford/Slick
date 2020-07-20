import {connect} from 'react-redux';

import MessageItem from './message_item';

import { updateMessage, fetchMessages } from '../../actions/message_actions';

const mdp = dispatch => {
    return {
        updateMessage: message => dispatch(updateMessage(message)),
        fetchMessages: channelId => dispatch(fetchMessages(channelId))
    }
}

export default connect(null,mdp)(MessageItem);