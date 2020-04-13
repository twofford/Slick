export const getChannels = () => {
    return $.ajax ({
        url: '/api/channels'
    })
}

export const getChannel = (channel) => {
    return $.ajax ({
        url: `/api/channels/${channel.id}`
    })
}

export const postChannel = (channel) => {
    return $.ajax ({
        url: '/api/channels/',
        method: 'POST',
        data: {channel}
    })
}

export const patchChannel = (channel) => {
    return $.ajax ({
        url: `/api/channels/${channel.id}`,
        method: 'PATCH',
        data: {channel}
    })
}

export const deleteChannel = (channel) => {
    return $.ajax ({
        url: `/api/channels/${channel.id}`,
        method: 'DELETE'
    })
}