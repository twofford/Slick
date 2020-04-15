import {
    fetchChannels,
    fetchChannel,
    createChannel,
    updateChannel,
    deleteChannel
} from '../../actions/channel_actions'

import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';

import Channel from './channel';

const msp = (state, ownProps) => {
    // debugger
    return {
        users: state.entities.users,
        channel: state.entities.channels[ownProps.match.params.channelId],
        currentUser: state.entities.users[state.session.id]
    }
};

const mdp = dispatch => (
    {
        fetchChannels: () => dispatch(fetchChannels()),

        createChannel: channel => dispatch(createChannel(channel)),

        fetchChannel: channel => dispatch(fetchChannel(channel)),

        updateChannel: channel => dispatch(updateChannel(channel)),

        deleteChannel: channel => dispatch(deleteChannel(channel))
    }
)

export default withRouter(connect(msp,mdp)(Channel));