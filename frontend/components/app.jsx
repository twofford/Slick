import React from 'react';
import {Route, Switch} from 'react-router-dom';

//COMPONENTS//

import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import SplashContainer from './splash/splash_container';
import ChannelViewportContainer from './channels/channel_viewport_container';
import {AuthRoute, ProtectedRoute} from '../util/route';
import Modal from './modal/modal';

//

const App = () => (
    <>
        
            <Modal/>
            <AuthRoute exact path='/' component={SplashContainer}/>
            <AuthRoute exact path='/login' component={LoginContainer}/>
            <AuthRoute exact path='/signup' component={SignupContainer}/>
            <ProtectedRoute path='/channels/:channelId' component={ChannelViewportContainer}/>
            
      
    </>
)

export default App;