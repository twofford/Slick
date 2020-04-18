class ChatChannel < ApplicationCable::Channel

    def subscribed
        @channel = Channel.find(params[:id])
        stream_for channel
    end

    def self.speak(data)
        message = @channel.messages.new(body: data['message'])
        message.user_id = current_user.id

        if message.save
            socket_message = {message: message.to_json, type: 'message'}
            ChatChannel.broadcast_to(@channel, socket_message)
        end

    end

    def self.load
        messages = @channel.messages.all
        socket_messages = {messages: messages, type: messages}
        ChatChannel.broadcast_to(@channel, socket_messages)
    end

    def unsubscribed
    end

end
