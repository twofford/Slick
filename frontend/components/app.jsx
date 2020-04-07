import React from 'react';
import {Route} from 'react-router-dom';

import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import NavbarContainer from './navbar/navbar_container';

const App = () => (
    <div>
        <Route exact path='/' component={NavbarContainer}/>
        <Route exact path='/login' component={LoginContainer}/>
        <Route exact path='/signup' component={SignupContainer}/>
    </div>
)

export default App;