import { connect } from 'react-redux';
import { login, logout } from '../../actions/session_actions';
import { updateUser, fetchUsers } from '../../actions/user_actions';
import LoginForm from './login_form'

const msp = state => {
    return {errors: state.errors.session}
}

const mdp = dispatch => ({
    login: user => dispatch(login(user)),
    logout: () => dispatch(logout()),
    updateUser: user => dispatch(updateUser(user)),
    fetchUsers: () => dispatch(fetchUsers())
})

export default connect(msp, mdp)(LoginForm);