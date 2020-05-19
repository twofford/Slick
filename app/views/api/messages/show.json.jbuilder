# json.partial! 'api/messages/message', message: @message

json.set! @message.id do
    json.partial! 'message', message: @message
end