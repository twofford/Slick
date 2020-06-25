import { connect } from 'react-redux';
import NewDMForm from './new_dm_form';
import { createChannel } from '../../actions/channel_actions';
import { closeModal } from '../../actions/modal_actions';
import { fetchUsers } from '../../actions/user_actions';

const msp = state => {
    return {
        channels: state.entities.channels,
        users: state.entities.users,
        currentUser: state.session.user.id
    }
}

const mdp = dispatch => {
    return {
        createChannel: channel => dispatch(createChannel(channel)),
        fetchUsers: () => dispatch(fetchUsers()),
        closeModal: () => dispatch(closeModal())

    }
}

export default connect(msp, mdp)(NewDMForm);