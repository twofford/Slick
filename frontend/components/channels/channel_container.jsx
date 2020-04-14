import {connect} from 'react-redux';

import Channel from './channel';

const msp = state => (
    {
        state: state
    }
);

const mdp = dispatch => (
    {
        fetchChannels: () => dispatch(fetchChannels()),

        createChannel: channel => dispatch(createChannel(channel)),

        fetchChannel: channel => dispatch(fetchChannel(channel)),

        updateChannel: channel => dispatch(updateChannel(channel)),

        deleteChannel: channel => dispatch(deleteChannel(channel))
    }
)

export default connect(msp,mdp)(Channel);