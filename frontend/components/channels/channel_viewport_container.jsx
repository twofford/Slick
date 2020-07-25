import {connect} from 'react-redux';
import {logout} from '../../actions/session_actions';
import {openModal} from '../../actions/modal_actions';
import {logoutNewUser} from '../../actions/appearance_actions';
import ChannelViewport from './channel_viewport';

const msp = state => {
    return {
    users: state.entities.users,
    currentUser: state.entities.users[state.session.user.id],
    channels: state.entities.channels
}}

const mdp = dispatch => {
    return {
        openModal: modal => dispatch(openModal(modal)),
        logout: () => dispatch(logout()),
        disappear: user => dispatch(logoutNewUser(user))
    }
}

export default connect(msp,mdp)(ChannelViewport);