import React from 'react';
import {connect} from 'react-redux';
import {
    Route,
    Redirect,
    withRouter
} from 'react-router-dom';

//DEBUGGING NOTE: LOGGEDIN ISN'T WORKING. IT'S RETURNING FALSE EVEN WHEN THERE'S A USER IN SESSION.

const Auth = ({ component: Component, path, loggedIn, channelId, exact }) => {
    // debugger
    return <Route path={path} exact={exact} render={(props) => (
        !loggedIn ? (
            <Component {...props} />
        ) : (
                <Redirect to={`/channels/${channelId}`} />
            )
    )} />
        };

const Protected = ({ component: Component, path, loggedIn, exact }) => {
    // debugger
    return <Route path={path} exact={exact} render={(props) => (
        loggedIn ? (
            <Component {...props} />
        ) : (
                <Redirect to="/" />
            )
    )} />
        };

const mapStateToProps = state => {
    return {
        loggedIn: Boolean(state.session.user.id),
        channelId: state.session.user.channel_id
    };
}

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));