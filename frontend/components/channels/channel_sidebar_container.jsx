import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    fetchChannels,
    fetchChannel,
    createChannel,
    updateChannel,
    deleteChannel

} from '../../actions/channel_actions';
import {fetchUsers} from '../../actions/user_actions';

import { openModal } from '../../actions/modal_actions';

import ChannelSidebar from './channel_sidebar';

const msp = (state, ownProps) => {
    return {
        currentUser: state.entities.users[state.session.user.id],
        channels: state.entities.channels,
        currentChannelId: ownProps.match.params.channelId,
        appearances: state.entities.appearances
    }
}

const mdp = dispatch => {
    return {
        fetchChannels: () => dispatch(fetchChannels()),

        createChannel: channel => dispatch(createChannel(channel)),

        fetchChannel: channel => dispatch(fetchChannel(channel)),

        updateChannel: channel => dispatch(updateChannel(channel)),

        deleteChannel: channel => dispatch(deleteChannel(channel)),

        logout: () => dispatch(logout()),

        openModal: modal => dispatch(openModal(modal)),

        fetchUsers: () => dispatch(fetchUsers())
    }
}

export default withRouter(connect(msp,mdp)(ChannelSidebar));