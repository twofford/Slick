import {postUser, postSession, deleteSession} from "../util/session";

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';

export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveCurrentUser = (user) => {
    
    return {
    type: RECEIVE_CURRENT_USER,
    user
}}

export const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER,
})

export const receiveErrors = (errors) => ({
    type: RECEIVE_ERRORS,
    errors
})

export const createNewUser = (user) => dispatch =>
    postUser(user).then(user =>
    dispatch(receiveCurrentUser(user)), errors => (
    dispatch(receiveErrors(errors.responseJSON))
));

export const login = (user) => dispatch => 
    postSession(user).then(user =>
    dispatch(receiveCurrentUser(user)), errors => {
        // debugger
        return dispatch(receiveErrors(errors.responseJSON))}
);

export const logout = () => dispatch =>
    deleteSession().then(() =>
    dispatch(logoutCurrentUser()));



