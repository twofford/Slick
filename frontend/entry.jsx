import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./components/root";
import configureStore from './store/store';
import {receiveCurrentUser, logoutCurrentUser, createNewUser, login, logout} from './actions/session';
import {postUser, postSession, deleteSession} from './util/session';


document.addEventListener('DOMContentLoaded', () => {
    
    let preloadedState = undefined;

    if (window.currentUser) {
        preloadedState = {
            session: {
                currentUser: window.currentUser
            }
        }
    }

    const root = document.getElementById('root')
    const store = configureStore();
    
    //TEST
    window.dispatch = store.dispatch;
    window.createNewUser = createNewUser;
    window.login = login;
    window.logout = logout;
    window.getState = store.getState
    window.postUser = postUser
    window.postSession = postSession
    window.deleteSession = deleteSession
    window.receiveCurrentUser = receiveCurrentUser
    window.logoutCurrentUser = logoutCurrentUser
    //TEST

    ReactDOM.render(<Root store={store}/>, root);

});