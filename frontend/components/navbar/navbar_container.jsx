import {connect} from 'react-redux';
import Navbar from './navbar';

const msp = state => ({
    currentUser: state.session.currentUser
})

const mdp = dispatch => ({
    logout: () => dispatch(logout())
})

export default connect(msp,mdp)(Navbar);