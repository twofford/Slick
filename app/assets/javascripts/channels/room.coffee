App.channel = App.cable.subscriptions.create "ChatChannel",

  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    console.log(data)
  
  speak: (message) ->
    @perform 'speak', message: message

$(document).on 'keypress', '[id="room_speaker"]', (event) ->
  if event.keyCode is 13 # return/enter = send
    App.room.speak event.target.value
    event.target.value = ''
    event.preventDefault()