export const getMessages = (channel) => {
    return $.ajax({
        url: `api/channels/${channel.id}`
    })
};

export const postMessage = (message) => {
    return $.ajax({
        url: `/api/${message.channelId}`,
        method: 'POST',
        data: {message}
    })
};

export const patchMessage = (message) => {
    return $.ajax({
        url: `/api/${message.channelId}/${message.id}`,
        method: 'PATCH',
        data: {message}
    })
};

export const deleteMessage = (message) => {
    return $.ajax({
        url: `/api/${message.channelId}/${message.id}`,
        method: 'DELETE'

    })
};

