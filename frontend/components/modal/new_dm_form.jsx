import React from "react";
import moment from "moment";
moment().format();

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
    // Object.values(this.props.channels).forEach((channel) => {
    //   this.props.fetchMessages(channel.id);
    // });
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
    if (this.state.searchValue === "") {
      document.getElementById("recent-dms").style = "display: visible";
    } else {
      document.getElementById("recent-dms").style = "display: none";
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
    const usersArray = Object.values(this.props.users) //an array of all user objects
      .filter((user) => this.props.currentUser !== user.id) //excluding the current user
      .filter((user) => !this.doesDmExist(user)); //excluding users with whom the current user has an existing dm

    const dmsArray = Object.values(this.props.channels).filter(
      //an array of dm channel objects
      (channel) => channel.channel_or_dm === "dm"
    );

    const allMessages = Object.values(this.props.messages); //an array of all message objects

    const allChannels = Object.values(this.props.channels); //an array of all channel objects

    const allDMs = allChannels.filter(
      (channel) => channel.channel_or_dm === "dm"
    ); //an array of all dm channel objects

    const channelsWithMessages = [
      ...new Set(allMessages.map((message) => message.channel_id)),
    ]; //an array of all channel ids for channels containing messages

    const dmsWithMessagesArray = allDMs.filter((
      dm //an array of dms containing messages
    ) => channelsWithMessages.includes(dm.id));

    const dmsWithMessagesAndCurrentUserTitlesArray = dmsWithMessagesArray.map(dm => dm.users.map(user => user.email)).filter(dm => dm.includes(this.props.currentUserEmail)).map(dm => dm.join(', '));

    const dmsWithMessagesAndCurrentUserArray = dmsWithMessagesArray.filter(
      (dm) => dmsWithMessagesAndCurrentUserTitlesArray.includes(dm.title)
    );

    console.log(dmsWithMessagesArray, dmsWithMessagesAndCurrentUserArray);

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

        {
          //SEARCH RESULTS//
        }

        <ul id="search-results-ul">
          <div id="recent-dms">Recent conversations</div>
          {this.state.searchValue // if there's something in the search value
            ? allChannelsArray.map((channel) => {
                let lastMessage;
                let lastMessageUser;
                let lastMessageTimeSince;

                const channelMessages = Object.values(
                  this.props.messages
                ).filter((message) => message.channel_id === channel.id);

                if (channelMessages.length === 0) {
                  lastMessage = null;
                  lastMessageUser = null;
                } else if (channelMessages.length === 1) {
                  lastMessage = channelMessages[0].body;
                  lastMessageUser = channelMessages[0].user.email;
                  lastMessageTimeSince = moment(
                    channelMessages[0].updated_at
                  ).fromNow();
                } else {
                  lastMessage =
                    channelMessages[channelMessages.length - 1].body;
                  lastMessageUser =
                    channelMessages[channelMessages.length - 1].user.email;
                  lastMessageTimeSince = moment(
                    channelMessages[channelMessages.length - 1].updated_at
                  ).fromNow();
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
                            const newUsers = [
                              ...new Set(
                                state.users.concat(
                                  channel.users
                                    .filter(
                                      (user) =>
                                        user.email !==
                                        this.props.currentUserEmail
                                    )
                                    .map((user) => user.email)
                                )
                              ),
                            ];
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
                            <span className="search-result-title">
                              {this.displayTitle(channel.title)}
                            </span>
                            <br />
                            <span className="search-result-last-message-user">
                              {lastMessageUser}
                            </span>
                            {lastMessage}
                          </div>
                          <span className="last-message-time-since-span">
                            {lastMessageTimeSince}
                          </span>
                        </div>
                      </li>
                    );
                  }
                } else {
                  //if the DM doesn't exist yet (i.e., it's a single user)
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
                            const newUsers = [
                              ...new Set(state.users.concat(channel.email)),
                            ];

                            return { users: newUsers, searchValue: "" };
                          });

                          document.getElementById(`${channel.id}`).style =
                            "display: none";

                          document.getElementById("dm-search-input").value = "";
                        }}
                      >
                        <div className="search-result">
                          <img className="search-avatar" src={avatar} />
                          <div>
                            <span className="search-result-title">
                              {this.displayTitle(channel.email)}
                            </span>
                            <br />
                          </div>
                        </div>
                      </li>
                    );
                  }
                }
              })
            : //if there is nothing in the search value

              dmsWithMessagesAndCurrentUserArray.map((channel) => {
                let lastMessage;
                let lastMessageUser;
                let lastMessageTimeSince;

                const channelMessages = Object.values(
                  this.props.messages
                ).filter((message) => message.channel_id === channel.id);

                //if there's only one message
                if (channelMessages.length === 1) {
                  lastMessage = channelMessages[0].body;

                  lastMessageUser = channelMessages[0].user.email;

                  lastMessageTimeSince = moment(
                    channelMessages[0].updated_at
                  ).fromNow();

                  //if there's more than one message
                } else {
                  lastMessage =
                    channelMessages[channelMessages.length - 1].body;

                  lastMessageUser =
                    channelMessages[channelMessages.length - 1].user.email;

                  lastMessageTimeSince = moment(
                    channelMessages[channelMessages.length - 1].updated_at
                  ).fromNow();
                }

                if (lastMessageUser === this.props.currentUserEmail) {
                  lastMessageUser = "You";
                }

                if (lastMessageUser) {
                  lastMessageUser += ": ";
                }

                return (
                  <li
                    className="search-result-li"
                    key={channel.id}
                    id={channel.id}
                    onClick={() => {
                      this.setState((state) => {
                        const newUsers = [
                          ...new Set(
                            state.users.concat(
                              channel.users
                                .filter(
                                  (user) =>
                                    user.email !== this.props.currentUserEmail
                                )
                                .map((user) => user.email)
                            )
                          ),
                        ];

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
                        <span className="search-result-title">
                          {this.displayTitle(channel.title)}
                        </span>
                        <br />
                        <span className="search-result-last-message-user">
                          {lastMessageUser}
                        </span>

                        {lastMessage}
                      </div>
                      <span className="last-message-time-since-span">
                        {lastMessageTimeSince}
                      </span>
                    </div>
                  </li>
                );
              })}
        </ul>
        {this.renderErrors()}
      </div>
    );
  }
}

export default NewDMForm;
