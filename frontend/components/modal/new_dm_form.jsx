import React from "react";

class NewDMForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      channel_or_dm: "dm",
      channel_type: "private",
      users: [],
      searchValue: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);

    this.formatTitle = this.formatTitle.bind(this);

    this.doesDmExist = this.doesDmExist.bind(this);

    this.displayTitle = this.displayTitle.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.state.title = this.formatTitle(this.state.users);
    const channelsArray = Object.values(this.props.channels);
    const channelTitlesArray = channelsArray.map((channel) => channel.title);
    if (channelTitlesArray.includes(this.state.title)) {
      const channelIdx = channelTitlesArray.indexOf(this.state.title);
      const channel = channelsArray[channelIdx];
      this.props.history.push(`/channels/${channel.id}`);
      this.props.closeModal();
    } else {
      const channel = Object.assign({}, this.state);
      this.props.createChannel(channel).then((channel) => {
        this.props.history.push(`/channels/${channel.channel.id}`);
        this.props.closeModal();
      });
    }
  }

  handleInput(type) {
    return (event) => {
      this.setState({
        [type]: event.target.value,
      });
    };
  }

  formatTitle(users) {
    if (users.length > 0) {
      const allUsers = users.concat(
        this.props.users[this.props.currentUser].email
      );
      return allUsers.sort().join(", ");
    } else return this.state.title;
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li className="error" key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  componentDidUpdate() {
    document.getElementById("dm-search-input").focus();
    const searchButton = document.getElementById("search-button");
    if (this.state.users.length != 0) {
      searchButton.classList.add("enabled-button");
      searchButton.classList.remove("disabled-button");
    } else {
      searchButton.classList.add("disabled-button");
      searchButton.classList.remove("enabled-button");
    }
  }

  doesDmExist(user) {
    let title = [user.email].concat(
      this.props.users[this.props.currentUser].email
    );
    title = title.sort().join(", ");

    return Object.values(this.props.channels)
      .map((channel) => channel.title)
      .includes(title)
      ? true
      : false;
  }

  displayTitle(title) {
    const channelDisplayTitleArray = title.split(", ");
    const currentUserRemoved = channelDisplayTitleArray.filter(
      (user) => user !== this.props.currentUserEmail
    );
    return currentUserRemoved.join(", ");
  }

  render() {
    const usersArray = Object.values(this.props.users)
      .filter((user) => this.props.currentUser !== user.id)
      .filter((user) => !this.doesDmExist(user));

    const dmsArray = Object.values(this.props.channels).filter(
      (channel) => channel.channel_or_dm === "dm"
    );

    const allChannelsArray = usersArray.concat(dmsArray);

    let inputPlaceholder;

    if (this.state.users.length !== 0) {
      inputPlaceholder = "";
    } else inputPlaceholder = "Find or start a conversation";

    return (
      <div>
        <div id="modal-header">
          <h1 id="new-dm-form-h1">Direct Messages</h1>
          <button id="modal-closer" onClick={() => this.props.closeModal()}>
            &times;
          </button>
        </div>

        <div id="fake-search-box-container">
          <div id="fake-search-box">
            <span id="dm-included-users">
              {this.state.users.map((user, index) => {
                return (
                  <span key={index} className="user-tag">
                    <img className="avatar" src={avatar}></img>
                    <span className="dm-user-name">{user}</span>
                    <button
                      className="dm-button"
                      onClick={() => {
                        const usersCopy = [...this.state.users];
                        const toBeDeletedIndex = usersCopy.indexOf(user);
                        usersCopy.splice(toBeDeletedIndex, 1);
                        this.setState({ users: usersCopy });
                      }}
                    >
                      X
                    </button>
                  </span>
                );
              })}
              <input
                onFocus={() => {
                  document.getElementById("fake-search-box").style =
                    "box-shadow: 0 0 0 4px #bee2f1;";
                }}
                onBlur={() => {
                  document.getElementById("fake-search-box").style =
                    "box-shadow: none;";
                }}
                id="dm-search-input"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder={inputPlaceholder}
                onChange={this.handleInput("searchValue")}
              />
            </span>
          </div>
          <button
            id="search-button"
            className="disabled-button"
            onClick={this.handleSubmit}
          >
            Go
          </button>
        </div>

        <ul id="search-results-ul">
          {allChannelsArray.map((channel) => {

            let lastMessage;
            let lastMessageUser;

            const channelMessages = Object.values(this.props.messages).filter(message => message.channel_id === channel.id);

            if (channelMessages.length === 0) {
              lastMessage = null;
              lastMessageUser = null;
            } else if (channelMessages.length === 1) {
              console.log(channelMessages[0])
              lastMessage = channelMessages[0].body;
              lastMessageUser = channelMessages[0].user.email;
            } else {
              lastMessage = channelMessages[channelMessages.length - 1].body;
              lastMessageUser = channelMessages[channelMessages.length - 1].user.email;
            }

            if (lastMessageUser === this.props.currentUserEmail) {
              lastMessageUser = "You";
            }

            if (lastMessageUser) {
              lastMessageUser += ": ";
            }

            

            if (channel.channel_or_dm) {
              //if it is an existing DM
              if (
                this.displayTitle(channel.title)
                  .toLowerCase()
                  .startsWith(this.state.searchValue)
              ) {
                return (
                  <li
                    className="search-result-li"
                    key={channel.id}
                    id={channel.id}
                    onClick={() => {
                      this.setState((state) => {
                        const newUsers = state.users.concat(
                          channel.users
                            .filter(
                              (user) =>
                                user.email !== this.props.currentUserEmail
                            )
                            .map((user) => user.email)
                        );

                        return { users: newUsers, searchValue: "" };
                      });

                      document.getElementById(`${channel.id}`).style =
                        "display: none;";

                      document.getElementById("dm-search-input").value = "";
                    }}
                  >
                    <div className="search-result">
                      <img className="search-avatar" src={avatar} />
                      <div>
                        <span className="search-result-title">{this.displayTitle(channel.title)}</span>
                        <br />
                        <span className="search-result-last-message-user">{lastMessageUser}</span>
                        <span className="search-result-last-message">{lastMessage}</span>
                      </div>
                    </div>
                  </li>
                );
              }
            } else {
              //if the DM doesn't exist yet (i.e., it's just a user)
              if (
                channel.email
                  .toLowerCase()
                  .startsWith(this.state.searchValue) &&
                !this.state.users.includes(channel.email)
              ) {
                return (
                  <li
                    className="search-result-li"
                    key={channel.id}
                    id={channel.id}
                    onClick={() => {
                      this.setState((state) => {
                        const newUsers = state.users.concat(channel.email);

                        return { users: newUsers, searchValue: "" };
                      });

                      document.getElementById(`${channel.id}`).style =
                        "display: none";

                      document.getElementById("dm-search-input").value = "";
                    }}
                  >
                    {channel.email}
                  </li>
                );
              }
            }
          })}

          {/* {usersArray.map((user) => {
                if (
                  user.email.toLowerCase().startsWith(this.state.searchValue) &&
                  !this.state.users.includes(user.email) 
                  // && this.state.searchValue !== ""
                ) {
                  return (
                    <li
                      className="search-result-li"
                      id={user.email}
                      key={user.id}
                      onClick={() => {
                        this.setState((state) => {
                          const newUsers = state.users.concat(user.email);
                          return { users: newUsers, searchValue: "" };
                        });

                        document.getElementById(`${user.email}`).style =
                          "display: none;";

                        document.getElementById("dm-search-input").value = "";
                      }}
                    >
                      <div className="search-result">
                        <img className="search-avatar" src={avatar}></img>
                        {user.email}
                      </div>
                    </li>
                  );
                } else return null;
              })} */}
        </ul>
        {this.renderErrors()}
      </div>
    );
  }
}

export default NewDMForm;
