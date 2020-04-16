class ChatChannel < ApplicationCable::Channel

    def subscribed
        stream_from 'chat_#params[:channelId]' #might have to change this to channel.id or something else
    end


    def self.speak(channel, message)
        AcitonCable.server.broadcast "chat_#{channel}", message
    end
end
