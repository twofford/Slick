class ChatChannel < ApplicationCable::Channel

    def subscribed
        stream_from 'channel'
    end

end
#     def load(id)

#         channel = Channel.includes(:messages).find(params[:id])

#         messages = channel.messages.order(:created_at)

#         users = messages.pluck(:user_id)

#         socket = {messages: [messages, users], type: 'messages'} #what does this do?
        
#         ChatChannel.broadcast_to(channel, socket) #what does this do?
#     end

#     def speak(data)

#         channel = Channel.includes(:messages).find(params[:id])

#         message = Message.create(user_id: data['id'], channel_id: channel.id, body: data['message'])

#         socket = {message: [message.body], data['id'], type: 'message'}

#         ChatChannel.broadcast_to(channel, socket)

#     end

#     def unsubscribed
#     end

#     def speak(data)
#         ActionCable.server.broadcast "chat_channel", message: data['message']
#     end
    
# end