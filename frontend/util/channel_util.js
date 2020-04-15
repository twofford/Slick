export const getChannels = () => {
    return $.ajax ({
        url: '/api/channels'
    })
}

export const getChannel = (channelId) => {
    return $.ajax ({
        url: `/api/channels/${channelId}`
    })
}

export const postChannel = (channel) => {
    return $.ajax ({
        url: '/api/channels/',
        method: 'POST',
        data: {channel}
    })
}

export const patchChannel = (channelId) => {
    return $.ajax ({
        url: `/api/channels/${channelId}`,
        method: 'PATCH',
        data: {channel}
    })
}

export const deleteChannel = (channelId) => {
    return $.ajax ({
        url: `/api/channels/${channelId}`,
        method: 'DELETE'
    })
}