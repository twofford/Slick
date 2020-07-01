import { connect } from 'react-redux';
import Searchbar from './searchbar';

const msp = state => {
    return {
        users: state.entities.users,
        currentUser: state.session.user,
        channels: state.entities.channels,
        messages: state.entities.messages
    }
}

// const mdp = dispatch => {

// }

export default connect(msp,null)(Searchbar);