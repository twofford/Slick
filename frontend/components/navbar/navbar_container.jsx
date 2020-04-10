import {connect} from 'react-redux';
import Navbar from './navbar';

const msp = state => {
    // debugger
    return {
    currentUser: state.session.user.id
}}

const mdp = dispatch => ({
    logout: () => dispatch(logout())
})

export default connect(msp,mdp)(Navbar);