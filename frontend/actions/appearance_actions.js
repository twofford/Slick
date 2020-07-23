export const RECEIVE_NEW_USER = 'RECEIVE_NEW_USER';

export const receiveNewUser = user => {
    return {
        type: RECEIVE_NEW_USER,
        user
    }
}