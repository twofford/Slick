import {connect} from 'react-redux';
import Splash from './splash';

const msp = state => {
    return {
        currentUser: state.session.id
    }
}

export default connect(msp,null)(Splash);