import { connect } from 'react-redux';
import NewDMForm from './new_dm_form';
import { createChannel, fetchChannel, clearErrors } from '../../actions/channel_actions';
import { closeModal } from '../../actions/modal_actions';
import { fetchUsers } from '../../actions/user_actions';
import { fetchMessages } from '../../actions/message_actions';
import { withRouter } from 'react-router-dom';

const msp = state => {
    return {
        channels: state.entities.channels,
        users: state.entities.users,
        currentUser: state.session.user.id,
        errors: state.errors.channel,
        currentUserEmail: state.entities.users[state.session.user.id].email,
        messages: state.entities.messages
    }
}

const mdp = dispatch => {
    return {
        createChannel: channel => dispatch(createChannel(channel)),
        fetchChannel: channel => dispatch(fetchChannel(channel)),
        fetchUsers: () => dispatch(fetchUsers()),
        closeModal: () => dispatch(closeModal()),
        clearErrors: () => dispatch(clearErrors()),
        fetchMessages: (channelId) => dispatch(fetchMessages(channelId))

    }
}

export default withRouter(connect(msp, mdp)(NewDMForm));