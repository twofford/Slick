import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createMessage } from '../../actions/message_actions';

import NewMessageForm from './new_message_form';

const msp = (state, ownProps) => {
    // debugger
    return {
        currentUser: state.entities.users[state.session.user.id],
        currentChannelId: ownProps.match.params.channelId
    }
}

const mdp = dispatch => {
    return {
        createMessage: message => dispatch(createMessage(message))
    }
}

export default withRouter(connect(msp,mdp)(NewMessageForm));

