import { connect } from 'react-redux';
import { login, logout } from '../../actions/session';
import LoginForm from './login_form'

const mdp = dispatch => ({
    login: user => dispatch(login(user)),
    logout: () => dispatch(logout())
})

export default connect(null, mdp)(LoginForm);