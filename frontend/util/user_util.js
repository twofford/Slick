export const getUsers = () => {
    return $.ajax({
        url: '/api/users'
    })
}

export const patchUser = user => {
    return $.ajax({
        url: `api/users/${user.id}`,
        method: 'PATCH',
        data: {user}
    })
}