class OnlineChannel < ApplicationCable::AppearanceChannel

    def subscribed
        stream_for 'online_channel'
    end

    def speak(data)
        
    end

end