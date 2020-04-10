import { connect } from 'react-redux';
import { login, logout } from '../../actions/session_actions';
import LoginForm from './login_form'

const msp = state => ({
    errors: state.errors.session
})

const mdp = dispatch => ({
    login: user => dispatch(login(user)),
    logout: () => dispatch(logout())
})

export default connect(msp, mdp)(LoginForm);