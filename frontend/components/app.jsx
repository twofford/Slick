import React from 'react';
import {Route, Switch} from 'react-router-dom';

import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import NavbarContainer from './navbar/navbar_container';
import {AuthRoute} from '../util/route';

const App = () => (
    <div>
        <header>
            <NavbarContainer/>
        </header>
        <Switch>
            <AuthRoute exact path='/login' component={LoginContainer}/>
            <AuthRoute exact path='/signup' component={SignupContainer}/>
        </Switch>
    </div>
)

export default App;