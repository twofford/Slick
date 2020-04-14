import React from 'react';
import {Route, Switch} from 'react-router-dom';

//COMPONENTS//

import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import SplashContainer from './splash/splash_container';
import ChannelViewport from './channels/channel_viewport';
import {AuthRoute, ProtectedRoute} from '../util/route';

//

const App = () => (
    <>
        <Switch>
            <ProtectedRoute exact path='/' component={SplashContainer}/>
            <ProtectedRoute exact path='/login' component={LoginContainer}/>
            <ProtectedRoute exact path='/signup' component={SignupContainer}/>
            <AuthRoute exact path='/channels' component={ChannelViewport}/>
        </Switch>
    </>
)

export default App;