import React from "react";
import moment from "moment";
moment().format();

export default class MessageItem extends React.Component {
  constructor(props) {
    super(props);

    this.getDate = this.getTimestamp.bind(this);

    this.state = {
      id: this.props.message.id,
      channel_id: this.props.message.channel_id,
      body: "",
      user_id: this.props.message.user.id,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.edited = this.edited.bind(this);
  }

  getTimestamp() {
    return moment(new Date(this.props.message.created_at)).format("h:mm A");
  }

  handleInput(type) {
    return (event) => {
      this.setState({
        [type]: event.target.value,
      });
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.body !== "") {
      const newMessage = Object.assign({}, this.state);

      this.props.updateMessage(newMessage).then((res) => {
        App.cable.subscriptions.subscriptions[0].speak({
          message: res.message,
        });
      });

      document.getElementById(`${this.props.message.id}-update`).style =
        "display: none";

      document.getElementById(`${this.props.message.id}-view`).style =
        "display:block;";

      document.getElementById(`${this.props.message.id}-input`).value = "";

      const wrapper = document.getElementById(
        `${this.props.message.id}-wrapper`
      );

      wrapper.classList.remove("beige");
      wrapper.classList.add("message-wrapper");
    }
  }

  edited() {
    if (this.props.message.updated_at > this.props.message.created_at) {
      return "(Edited)";
    } else return null;
  }

  render() {
    if (this.props.message.user.id === this.props.currentUserId) {
      //it's the current user's message
      return (
        <div
          id={`${this.props.message.id}-wrapper`}
          className="message-wrapper editable-message"
        >
          <div>
            <img className="message-avatar" src={avatar} />
          </div>
          <div
            id={`${this.props.message.id}-view`}
            className="message-container"
          >
            <div className="username-timestamp">
              <div className="username">{this.props.message.user.email}</div>
              <div className="timestamp">{this.getTimestamp()}</div>
            </div>
            <div className="message">
              {this.props.message.body}
              <span className="edited">{this.edited()}</span>
              <button
                className="message-edit-button"
                onClick={() => {
                  document.getElementById(
                    `${this.props.message.id}-view`
                  ).style = "display:none;";
                  document.getElementById(
                    `${this.props.message.id}-update`
                  ).style = "display: block";

                  const wrapper = document.getElementById(
                    `${this.props.message.id}-wrapper`
                  );

                  wrapper.classList.remove("message-wrapper");
                  wrapper.classList.add("beige");
                }}
              >
                <i className="fas fa-pen"></i>
              </button>
            </div>
          </div>

          <div
            className="update-message-container"
            id={`${this.props.message.id}-update`}
          >
            <form>

              <input
                className="message-update-input"
                id={`${this.props.message.id}-input`}
                type="text"
                placeholder={this.props.message.body}
                autoComplete="off"
                onChange={this.handleInput("body")}
              />

              <button
                className="update-cancel-button"
                onClick={(event) => {
                  event.preventDefault();
                  document.getElementById(
                    `${this.props.message.id}-view`
                  ).style = "display:block;";
                  document.getElementById(
                    `${this.props.message.id}-update`
                  ).style = "display: none";
                  document.getElementById(
                    `${this.props.message.id}-input`
                  ).value = "";

                  const wrapper = document.getElementById(
                    `${this.props.message.id}-wrapper`
                  );

                  wrapper.classList.remove("beige");
                  wrapper.classList.add("message-wrapper");
                }}
              >
                Cancel
              </button>

              <button
                className="update-submit-button"
                onClick={this.handleSubmit}
              >
                <i className="far fa-save"></i> Save Changes
              </button>
            </form>
          </div>
        </div>
      );
    } else {
      //it's somebody else's message
      return (
        <div className="message-wrapper">
          <div>
            <img className="message-avatar" src={avatar} />
          </div>
          <div className="message-container">
            <div className="username-timestamp">
              <div className="username">{this.props.message.user.email}</div>
              <div className="timestamp">{this.getTimestamp()}</div>
            </div>
            <div className="message">{this.props.message.body}</div>
          </div>
        </div>
      );
    }
  }
}
