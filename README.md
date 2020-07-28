# README

![logo](./app/assets/images/slick_logo_big.png)

Slick is a lightweight clone of [Slack](https://www.slack.com), a popular chat application. Users can post messages to public channels or private Direct Messages.

## Technologies
- React/Redux
- Ruby on Rails
- PostgresQL
- WebSockets

## Features

### Action Cable for User Status

Users of Slick should be able to tell which other users are logged in at any given time. After all, nobody wants to scream into the void. In order to achieve this, every time a new user logs in, the backend state should be updated and *every user's* frontend state should be updated. To update multiple users' frontend states at once, I used Action Cable, which integrates WebSockets with Ruby on Rails. Here's how it works:

First, an AJAX POST request hits the session controller. If it succeeds (i.e., if the user exists), an action is dispatched to the session reducer and the user is recorded in the frontend state. The React Router will now direct them to the app proper. Next, using the response we get back from the POST request, we make another AJAX request, this one a PATCH to the users controller setting the user's `online_status` to true. This, in turn, dispatches an action to the users reducer to update the current user's frontend state. After the PATCH request succeeds, we instantiate a subscription object to a new ActionCable channel called `AppearanceChannel`. Like the `ChatChannel`, which handles chat messages, the `AppearanceChannel` handles user logins and logouts. Instantiating the object allows the user to both send and receive data over the channel. After the subscription is created, we send the same object we sent to the PATCH request out over it. Finally, the `AppearanceChannel`'s `received` callback is fired for *every user who's logged in*. In that callback, we dispatch an action to the users reducer, causing the frontend state to update for *every user logged into the app*. We then pass that information to a React component as props, causing it to re-render. If a user is logged in, a green dot appears next to their name. Otherwise, a gray dot appears next to their name.

Here's the code:

 ```
 handleSubmit(event) {
    event.preventDefault();
    const user = Object.assign({}, this.state);
    this.props
      .login(user)
      .then((res) => {
        this.props
          .updateUser({
            id: res.user.id,
            email: res.user.email,
            online_status: true,
          })
          .then((res) => {
            App.cable.subscriptions.create(
              { channel: "AppearanceChannel" },
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
