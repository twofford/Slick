import React from 'react';
import {Route} from 'react-router-dom';

import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import NavbarContainer from './navbar/navbar_container';

const App = () => (
    <div>
        <Route path='/' component={NavbarContainer}/>
        <Route path='/login' component={LoginContainer}/>
        <Route path='/signup' component={SignupContainer}/>
    </div>
)

export default App;