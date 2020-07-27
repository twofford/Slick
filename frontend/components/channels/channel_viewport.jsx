import React from "react";

import ChannelSidebarContainer from "./channel_sidebar_container";
import ChannelContainer from "./channel_container";
import SearchbarContainer from "../searchbar/searchbar_container";

class ChannelViewport extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    const user = {
      email: this.props.currentUser.email,
      id: this.props.currentUser.id,
      online_status: false,
    };
    event.preventDefault();
    this.props
      .updateUser(user)
      .then((res) => {
        if (App.cable.subscriptions.subscriptions[1]) {
          App.cable.subscriptions.subscriptions[1].speak({
            user: user,
          });
        }

        return res;
      })
      .then((res) => {
        this.props.logout(res);
      })
      .then(() => {
        App.cable.subscriptions.subscriptions = [];
      });
  }

  render() {
    return (
      <>
        <div id="logged-in-container">
          <div className="search-bar">
            <div
              onClick={() => this.props.openModal("search")}
              className="search-inner-div"
            >
              <i className="fas fa-search"></i>
              &nbsp;&nbsp;
              <p>Search Your Workspace</p>
            </div>
            <p className="logout" onClick={this.handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              &nbsp;Sign Out
            </p>
          </div>
          <div className="channel-viewport">
            <ChannelSidebarContainer />
            <ChannelContainer />
          </div>
        </div>
      </>
    );
  }
}

export default ChannelViewport;
