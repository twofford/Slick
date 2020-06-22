import {getUsers} from "../util/user_util";

export const RECEIVE_USERS = 'RECEIVE_USERS';

export const receiveUsers = (users) => {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export const fetchUsers = () => dispatch => (
    getUsers().then(users => dispatch(receiveUsers(users)))
);