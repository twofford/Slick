import {connect} from 'react-redux';
import Navbar from './navbar';

const msp = state => {
    return {
    currentUser: state.session.id
}}

const mdp = dispatch => ({
    logout: () => dispatch(logout())
})

export default connect(msp,mdp)(Navbar);