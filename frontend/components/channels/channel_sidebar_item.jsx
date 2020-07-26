import React from "react";
import { Link } from "react-router-dom";

class ChannelSidebarItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let prefix;

    if (this.props.channel.channel_type === "public") {
      prefix = "#";
    } else {
      prefix = <i className="fas fa-lock"></i>;
    }

    if (this.props.channel.channel_or_dm === "channel") {
      if (this.props.currentChannelId == this.props.channel.id) {
        return (
          <li className="channel-li-current">
            <Link to={`/channels/${this.props.channel.id}`}>
              {prefix} {this.props.channel.title}
            </Link>
          </li>
        );
      } else {
        return (
          <li className="channel-li">
            <Link to={`/channels/${this.props.channel.id}`}>
              {prefix} {this.props.channel.title}
            </Link>
          </li>
        );
      }
    } else {
      const channelDisplayTitleArray = this.props.channel.title.split(", ");

      const channelDisplayTitleArrayFiltered = channelDisplayTitleArray.filter(
        (user) => user !== this.props.currentUser.email
      );

      const onlineUserEmails = Object.values(this.props.appearances).map(
        (user) => user.email
      );
      
      let channelDisplayTitle;

      if (channelDisplayTitleArrayFiltered.length > 1) {
        channelDisplayTitle = channelDisplayTitleArrayFiltered.join(", ");
      } else {
          if (onlineUserEmails.includes(channelDisplayTitleArrayFiltered[0])) {
            channelDisplayTitle = channelDisplayTitleArrayFiltered.join(", ");
            channelDisplayTitle = "green dot".concat(channelDisplayTitleArrayFiltered.join(", "));
          } else {
            channelDisplayTitle = channelDisplayTitleArrayFiltered.join(", ");
              channelDisplayTitle = "gray dot".concat(channelDisplayTitleArrayFiltered.join(", "));
          }
      }

      if (this.props.currentChannelId == this.props.channel.id) {
        return (
          <li className="dm-li-current">
            <Link to={`/channels/${this.props.channel.id}`}>
              <i className="fas fa-circle white"></i>&nbsp;{" "}
              {channelDisplayTitle}
            </Link>
          </li>
        );
      } else {
        return (
          <li className="dm-li">
            <Link to={`/channels/${this.props.channel.id}`}>
              <i className="fas fa-circle"></i>&nbsp; {channelDisplayTitle}
            </Link>
          </li>
        );
      }
    }
  }
}

export default ChannelSidebarItem;
