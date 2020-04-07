import { connect } from 'react-redux';
import { createNewUser } from '../../actions/session';
import Signup from './signup'

const msp = state => ({
    formType: 'password'
});

const mdp = dispatch => ({
    createNewUser: user => dispatch(createNewUser(user))
})

export default connect(msp, mdp)(Signup);