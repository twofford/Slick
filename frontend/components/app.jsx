import React from 'react';
import {Route, Switch} from 'react-router-dom';

//COMPONENTS//

import NavbarContainer from './navbar/navbar_container'
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import SplashContainer from './splash/splash_container';
import ChannelViewportContainer from './channels/channel_viewport_container';
import {AuthRoute, ProtectedRoute} from '../util/route';

//

const App = () => (
    <>
        
            
            <Route exact path='/' component={SplashContainer}/>
            <Route exact path='/login' component={LoginContainer}/>
            <Route exact path='/signup' component={SignupContainer}/>
            <Route path='/channels/:channelId' component={ChannelViewportContainer}/>
      
    </>
)

export default App;