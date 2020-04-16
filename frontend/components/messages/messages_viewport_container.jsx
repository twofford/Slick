import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import MessagesViewport from './messages_viewport';
import {fetchMessages} from '../../actions/message_actions';

const msp = (state, ownProps) => {
    // debugger
    return {
        messages: state.entities.messages,
        currentChannelId: ownProps.match.params.channelId
    }
}

const mdp = dispatch => {
    // debugger
    return {
        fetchMessages: (channelId) => dispatch(fetchMessages(channelId))
    }
}

export default withRouter(connect(msp,mdp)(MessagesViewport));

