import { connect } from 'react-redux';
import NewChannelForm from './new_channel_form';
import { createChannel } from '../../actions/channel_actions';

const msp = state => {
    return {
        channels: state.entities.channels
    }
}

const mdp = dispatch => {
    return {
        createChannel: channel => dispatch(createChannel(channel))
    }
}

export default connect(msp, mdp)(NewChannelForm);