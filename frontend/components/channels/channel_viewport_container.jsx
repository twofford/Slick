import {connect} from 'react-redux';
import {logout} from '../../actions/session_actions';

import ChannelViewport from './channel_viewport';

const msp = state => {
    return {
    users: state.entities.users,
    currentUser: state.entities.users[state.session.id],
    channels: state.entities.channels
}}

const mdp = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(msp,mdp)(ChannelViewport);