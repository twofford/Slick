import { connect } from 'react-redux';
import { createNewUser } from '../../actions/session';
import SignupForm from './signup_form'

const mdp = dispatch => ({
    createNewUser: user => dispatch(createNewUser(user))
})

export default connect(null, mdp)(SignupForm);