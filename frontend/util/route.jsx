import React from 'react';
import {connect} from 'react-redux';
import {
    Route,
    Redirect,
    withRouter
} from 'react-router-dom';
import Channel from '../components/channels/channel';


const Auth = ({ component: Component, path, loggedIn, channelId, exact }) => {
    return <Route path={path} exact={exact} render={(props) => (
        !loggedIn ? (
            <Component {...props} />
        ) : (
                <Redirect to={`/channels/${channelId}`} />
            )
    )} />
        };

const Protected = ({ component: Component, path, loggedIn, exact }) => {
    return <Route path={path} exact={exact} render={(props) => (
        loggedIn ? (
            <Component {...props} />
        ) : (
                <Redirect to="/" />
            )
    )} />
        };

const mapStateToProps = state => {

    console.log(state);

    return {
      loggedIn: Boolean(state.session.user.id),
      channelId: Boolean(state.session.user.id)
        ? state.session.user.channel.id
        : null,
    };
}

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));