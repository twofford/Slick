
import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./components/root";
import configureStore from './store/store';

//TEST
import {receiveCurrentUser, logoutCurrentUser, createNewUser, login, logout} from './actions/session_actions';
import {postUser, postSession, deleteSession} from './util/session_util';
import * as ChannelActions from './actions/channel_actions';
import {fetchUsers} from './actions/user_actions';
import {getUsers} from './util/user_util';
//TEST


document.addEventListener('DOMContentLoaded', () => {

    const root = document.getElementById('root')

    let store;

    if (window.currentUser) {
        const preloadedState = {
            session: {user: {id: window.currentUser.id}},
            entities: {
                users: {[window.currentUser.id]: window.currentUser}
            }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

    
    //SESSION TEST
    window.dispatch = store.dispatch;
    window.createNewUser = createNewUser;
    window.login = login;
    window.logout = logout;
    window.getState = store.getState;
    window.postUser = postUser;
    window.postSession = postSession;
    window.deleteSession = deleteSession;
    window.receiveCurrentUser = receiveCurrentUser;
    window.logoutCurrentUser = logoutCurrentUser;
    //

    //CHANNEL TEST
    window.fetchChannels = ChannelActions.fetchChannels
    window.fetchChannel = ChannelActions.fetchChannel
    window.createChannel = ChannelActions.createChannel
    window.updateChannel = ChannelActions.updateChannel
    window.deleteChannel = ChannelActions.deleteChannel
    //

    //USERS TEST
    window.getUsers = getUsers;
    window.fetchUsers = fetchUsers;

    ReactDOM.render(<Root store={store}/>, root);

});