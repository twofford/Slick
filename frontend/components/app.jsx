import React from 'react';
import {Route} from 'react-router-dom';

import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';

const App = () => (
    <div>
        <h1>This is the App component.</h1>
        <Route exact path='/login' component={LoginContainer}/>
        <Route exact path='/signup' component={SignupContainer}/>
    </div>
)

export default App;