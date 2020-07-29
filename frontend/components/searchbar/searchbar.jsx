import React from "react";
import { Link } from "react-router-dom";

export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchValue: "" };

    this.filteredChannelsArray = Object.values(this.props.channels)
      .filter((channel) => {
        return channel.users
          .map((user) => user.id)
          .includes(this.props.currentUser.id);
      })
      .sort((a, b) => {
        const aTitle = a.title.toUpperCase();
        const bTitle = b.title.toUpperCase();
        if (aTitle < bTitle) {
          return -1;
        } else if (aTitle > bTitle) {
          return 1;
        } else return 0;
      });

    const placeholderMessages = [
      "Search for something. Anything. You have the window open now anyway.",
      "Search the Log of All Conversation and Knowledge",
      "Search all across Slick",
      "Surely that's around here somewhere...",
      "What do you want to search for today?",
      "Delve into your archives, seize upon the answers. Rejoice.",
      "Type what you want to search for. Slick will do the rest.",
      "Input search. Beep boop.",
    ];

    const randomNum = (max) => {
      return Math.floor(Math.random() * max + 1);
    };

    this.placeholderText =
      placeholderMessages[randomNum(placeholderMessages.length - 1)];
  }

  handleInput(type) {
    return (event) => {
      this.setState({
        [type]: event.target.value,
      });
    };
  }

  displayTitle(title) {
    const channelDisplayTitleArray = title.split(", ");
    const currentUserRemoved = channelDisplayTitleArray.filter(
      (user) => user !== this.props.currentUserEmail
    );
    return currentUserRemoved.join(", ");
  }

  render() {
    const searchResults = (
      <>
        <div id="search-filler">Results:</div>
        <ul>
          {this.filteredChannelsArray.map((channel) => {
            let prefix;

            if (channel.channel_or_dm === "channel") {
              if (channel.channel_type === "public") {
                prefix = "#";
              } else prefix = <i className="fas fa-lock"></i>;
            } else prefix = "#";

            if (
              this.displayTitle(channel.title).toLowerCase().startsWith(this.state.searchValue.toLowerCase()) &&
              this.state.searchValue != ""
            ) {
              return (
                <Link
                  onClick={() => this.props.closeModal()}
                  className="search-li"
                  to={`/channels/${channel.id}`}
                >
                  {prefix}
                  {this.displayTitle(channel.title)}
                  <br></br>
                </Link>
              );
            } else return null;
          })}
        </ul>
      </>
    );

    const noSearchResults = <div id="search-filler">Narrow your search</div>;

    return (
      <>
        <form id="search-form" onSubmit={() => event.preventDefault()}>
          <i className="fas fa-search gray"></i>
          <input
            id="search-input"
            placeholder={this.placeholderText}
            type="text"
            autoComplete="off"
            onChange={this.handleInput("searchValue")}
          ></input>
          <a
            className="search-modal-closer"
            onClick={() => this.props.closeModal()}
          >
            &times;
          </a>
        </form>

        {this.state.searchValue ? searchResults : noSearchResults}

        {/* <ul>
          {this.filteredChannelsArray.map((channel) => {
            let prefix;

            if (channel.channel_or_dm === "channel") {
              if (channel.channel_type === "public") {
                prefix = "#";
              } else prefix = <i className="fas fa-lock"></i>;
            } else prefix = "#";

            if (
              channel.title.toLowerCase().startsWith(this.state.searchValue) &&
              this.state.searchValue != ""
            ) {
              return (
                <Link
                  onClick={() => this.props.closeModal()}
                  className="search-li"
                  to={`/channels/${channel.id}`}
                >
                  {prefix}
                  {channel.title}
                  <br></br>
                </Link>
              );
            } else return null;
          })}
        </ul> */}
      </>
    );
  }
}
