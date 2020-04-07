import React from 'react';
import {Route} from 'react-router-dom';

import SignupContainer from './session/signup_container';

const App = () => (
    <div>
        <h1>This is the App component.</h1>
        <Route path='/' component={SignupContainer} />
    </div>
)

export default App;