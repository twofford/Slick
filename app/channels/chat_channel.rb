class ChatChannel < ApplicationCable::Channel

    def subscribed
        stream_for 'chat_channel'
    end

    def speak(data)
        message = data['message']
        ChatChannel.broadcast_to('chat_channel', message)
    end

    def load
        channel = Channel.find(params[:id])
        messages = channel.messages.all
        socket_messages = {messages: messages, type: messages}
        ChatChannel.stream_for('chat_channel', socket_messages)
    end

    def unsubscribed
        stop_all_streams
    end

end
