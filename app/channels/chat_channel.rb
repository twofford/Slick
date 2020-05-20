class ChatChannel < ApplicationCable::Channel

    def subscribed
        stream_for 'chat_channel'
        # message = Message.find(params[:id])
        # stream_for message
    end

    def speak(data)
        message = data['message']
        ChatChannel.broadcast_to('chat_channel', message)

    end

    # def hear(data)
    #     channel = Channel.find(params[:id])
    #     message = channel.message.last
    #     socket_message = {message: message, type: message}
    #     ChatChannel.broadcast_to('chat_channel', socket_message)
    # end

    def load
        channel = Channel.find(params[:id])
        messages = channel.messages.all
        socket_messages = {messages: messages, type: messages}
        ChatChannel.stream_for('chat_channel', socket_messages)
    end

    def unsubscribed
    end

end
