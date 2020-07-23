class AppearanceChannel < ApplicationCable::Channel

    def subscribed
        stream_for 'appearance_channel'
    end

    def speak(data)
        user = data['user']
        AppearanceChannel.broadcast_to('appearance_channel',user)
    end

end