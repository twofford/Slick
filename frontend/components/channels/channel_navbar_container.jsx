import {connect} from 'react-redux';
import {
    fetchChannels,
    fetchChannel,
    createChannel,
    updateChannel,
    deleteChannel

} from '../../actions/channel_actions';
import ChannelNavbar from './channel_navbar';

const msp = state => {
    return {
        channels: state.entities.channels
    }
}

const mdp = dispatch => {
    return {
        fetchChannels: () => dispatch(fetchChannels()),

        createChannel: channel => dispatch(createChannel(channel)),

        fetchChannel: channel => dispatch(fetchChannel(channel)),

        updateChannel: channel => dispatch(updateChannel(channel)),

        deleteChannel: channel => dispatch(deleteChannel(channel))
    }
}

export default connect(msp,mdp)(ChannelNavbar);