class UsersChannel < ApplicationCable::Channel

    def subscribed
        stream_for 'users_channel'
    end

    def speak(data)
        user = data['user']
        UsersChannel.broadcast_to('users_channel', user)
    end

    def unsubscribed
    end

end