import { connect } from 'react-redux';
import { createNewUser, login } from '../../actions/session_actions';
import SignupForm from './signup_form';

const msp = state => {
    return {errors: state.errors.session}
}

const mdp = dispatch => ({
    createNewUser: user => dispatch(createNewUser(user)),
    login: user => dispatch(login(user))
})

export default connect(msp, mdp)(SignupForm);