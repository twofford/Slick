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

The meat and potatoes of any chat app is...well, chat. Users need to be able to create and update messages, and other users should be able to see those changes in realtime. To achieve that, I used Action Cable, Rails's built-in WebSockets library.

When a user posts a new message, we POST the message to the backend, a PostgreSQL database, then send the message out over a WebSocket channel to which all logged-in users are subscribed.

```js
frontend/components/modal/new_dm_form.jsx

handleSubmit(event) {
    
    event.preventDefault();
    
    if (this.state.body !== "") {
    
        const message = Object.assign({}, this.state);
        
        this.props.createMessage(message).then((res) => {
                    
          App.cable.subscriptions.subscriptions[0].speak({
            
            message: res.message,
          
          });
        
        });
                
        this.setState({
            
            body: ''
            
        })
        
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
![Users logging in and out](https://media.giphy.com/media/jUJfmnjxxgs4s44EJg/giphy.gif)

## Future Improvements

### Signup/Login
- Users should be able to choose an avatar or be assigned one randomly
### Messages
- Messages should be able to contain text, images, emoji and files

For additional information, see the [design docs](https://github.com/twofford/Slick/wiki).
