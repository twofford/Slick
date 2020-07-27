import { connect } from 'react-redux';
import { login, logout } from '../../actions/session_actions';
import { updateUser, fetchUsers, receiveUser } from '../../actions/user_actions';
import LoginForm from './login_form'

const msp = state => {
    return {errors: state.errors.session}
}

const mdp = dispatch => ({
    login: user => dispatch(login(user)),
    logout: () => dispatch(logout()),
    updateUser: user => dispatch(updateUser(user)),
    fetchUsers: () => dispatch(fetchUsers()),
    receiveUser: user => dispatch(receiveUser(user))
})

export default connect(msp, mdp)(LoginForm);