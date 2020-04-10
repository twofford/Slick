import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./components/root";
import configureStore from './store/store';
import {receiveCurrentUser, logoutCurrentUser, createNewUser, login, logout} from './actions/session';
import {postUser, postSession, deleteSession} from './util/session';


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
        // delete window.currentUser;
    } else {
        store = configureStore();
    }

    
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