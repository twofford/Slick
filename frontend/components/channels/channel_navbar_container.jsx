import {connect} from 'react-redux';
import {createChannel} from '../../actions/channel_actions';
import ChannelNavbar from './channel_navbar';

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

export default connect(msp,mdp)(ChannelNavbar);