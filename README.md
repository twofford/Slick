# README

![logo](./app/assets/images/slick_logo_big.png)

Slick is a lightweight clone of [Slack](https://www.slack.com), a popular chat application. Users can post messages to public channels or private Direct Messages.

## Technologies
- React/Redux
- Ruby on Rails
- PostgresQL
- WebSockets

## Features

### Realtime CRUD With Action Cable

The meat and potatoes of any chat app is...well, chat. Users need to be able to create and update messages, and other users should be able to see those changes in realtime. To achieve that, I used Action Cable, Rails's built-in WebSockets library. Here's how it works:

When a user posts a new message:

```
handleSubmit(event) {

    //first, we prevent the default behavior
    
    event.preventDefault();
    
    //then, we check that the user has actually typed a message

    if (this.state.body !== "") {
    
        //if they have, we create an object out of it

        const message = Object.assign({}, this.state);
        
        //then, we POST a message to the backend

        this.props.createMessage(message).then((res) => {
          
          //and send the message out over a WebSocket
          
          App.cable.subscriptions.subscriptions[0].speak({
            
            message: res.message,
          
          });
        
        });
        
        //finally, we reset the React component's state
        
        this.setState({
            
            body: ''
            
        })
        
        //and clear out the input field

        document.getElementById("message-form-input").value="";

    }
};
```
![Chat in action](https://media.giphy.com/media/VgZPqcNWQFHjOucV9P/giphy.gif)

When a user logs in, something similar happens:

```
handleSubmit(event) {

    //first, we prevent the default behavior
    
    event.preventDefault();
    
    //then, we create an object out of the user's email and password
    
    const user = Object.assign({}, this.state);
    
    //we log them in on the frontend and PATCH their online_status to true in the database
    
    this.props
      .login(user)
      .then((res) => {
        this.props
          .updateUser({
            id: res.user.id,
            email: res.user.email,
            online_status: true,
          })
          
          
          //then, we subscribe the user to the Users channel, which handles logins and logouts
          
          .then((res) => {
            App.cable.subscriptions.create(
              { channel: "UsersChannel" },
              {
                received: (data) => {
                  this.props.receiveUser(data);
                },
                speak: function (data) {
                  this.perform("speak", data);
                },
              }
            );
            return res;
          })
          
          //next, we send the user object we created out over the Users channel
          
          .then((res) => {
            App.cable.subscriptions.subscriptions[1].speak({
              user: {
                id: res.user.id,
                email: res.user.email,
                online_status: true,
              },
            });
          });
      })
      
      
      //finally, we fetch all user info from the database so we know who's already logged in
      
      .then(this.props.fetchUsers());
  }
```


### Chat
- Users can write and view messages in real time
- Users only see messages for the channel they're currently in

## Future Improvements
### Signup/Login
- Users should be able to choose a display name in addition to their email
- Users should be able to choose an avatar or be assigned one randomly
### Messages
- Messages should be able to contain text, images, emoji and files
- Users should be able to reply to specific messages
### Workspaces
- Implement workspaces

For additional information, see the [design docs](https://github.com/twofford/Slick/wiki).
