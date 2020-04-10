export const postUser = (user) => {
    return $.ajax({
        url: '/api/users',
        method: 'POST',
        data: {user},
        dataType: 'application/json'
    })
}

export const postSession = (user) => {
    return $.ajax({
        url: '/api/session/',
        method: 'POST',
        data: {user},
        dataType: 'application/json'
    })
}

export const deleteSession = () => (
    $.ajax({
        url: '/api/session/',
        method: 'DELETE'
    })
)