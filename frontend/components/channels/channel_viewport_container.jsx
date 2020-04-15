import {connect} from 'react-redux';

import ChannelViewport from './channel_viewport';

const msp = state => {
    // debugger
    return {
    users: state.entities.users,
    currentUser: state.entities.users[state.session.id],
    channels: state.entities.channels
}}

export default connect(msp,null)(ChannelViewport);