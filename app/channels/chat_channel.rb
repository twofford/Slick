class ChatChannel < ApplicationCable::Channel

    def subscribed
        stream_from "chat-#{params[:channelId]}"
    end

    def self.speak(channel, message)
        ActionCable.server.broadcast "chat_#{channel}", message
    end

end
