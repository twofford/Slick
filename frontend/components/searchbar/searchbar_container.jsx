import { connect } from 'react-redux';
import Searchbar from './searchbar';
import { closeModal } from '../../actions/modal_actions';

const msp = state => {
    return {
        users: state.entities.users,
        currentUser: state.session.user,
        channels: state.entities.channels,
        messages: state.entities.messages,
        currentUserEmail: state.entities.users[state.session.user.id].email
    }
}

const mdp = dispatch => {
    return{
        closeModal: () => dispatch(closeModal())
    }

}

export default connect(msp,mdp)(Searchbar);