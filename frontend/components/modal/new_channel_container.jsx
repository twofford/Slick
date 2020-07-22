import { connect } from 'react-redux';
import NewChannelForm from './new_channel_form';
import { createChannel, clearErrors } from '../../actions/channel_actions';
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';

const msp = state => {
    return {
        channels: state.entities.channels,
        errors: state.errors.channel
    }
}

const mdp = dispatch => {
    return {
        createChannel: channel => dispatch(createChannel(channel)),
        clearErrors: () => dispatch(clearErrors()),
        closeModal: () => dispatch(closeModal())

    }
}

export default withRouter(connect(msp, mdp)(NewChannelForm));