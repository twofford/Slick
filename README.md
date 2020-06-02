# README

![logo](./app/assets/images/slick_logo_big.png)

Slick is a lightweight clone of [Slack](https://www.slack.com), a popular chat application for businesses. Each business has a single workspace — a collection of topic-specific chatrooms called channels. Users can join multiple workspaces and contribute messages to multiple channels. Users can also have private conversations with other users. Messages may contain text, images or file attachments.

## Technologies
- React/Redux
- Ruby on Rails
- PostgresQL
- JavaScript

## Key Features
### User Authentication
- Users can log in with an existing account or create a new account
- Signing up requires a unique email address
- Invalid credentials will trigger errors on the backend and frontend
- Users can only access chat features if they're logged in
- Cookies keep users logged in even if they navigate away from the site

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
