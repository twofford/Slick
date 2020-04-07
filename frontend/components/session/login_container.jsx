import { connect } from 'react-redux';
import { login } from '../../actions/session';
import LoginForm from './login_form'

const mdp = dispatch => ({
    login: user => dispatch(login(user))
})

export default connect(null, mdp)(LoginForm);