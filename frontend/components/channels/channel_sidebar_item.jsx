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
    } else { //if it's a dm
      
      const channelDisplayTitle = this.props.channel.title
        .split(", ")
        .filter((user) => user !== this.props.currentUser.email)
        .join(", ");

      if (this.props.currentChannelId == this.props.channel.id) { //and it's the currently-selected dm
        if (this.props.onlineStatus) { //and the person is online
          return (
            <li className="dm-li-current">
              <Link to={`/channels/${this.props.channel.id}`}>
                <i className="fas fa-circle white"></i>&nbsp;{" "}
                {channelDisplayTitle}
              </Link>
            </li>
          );
        } else { //and the person is not online
          return (
            <li className="dm-li-current">
              <Link to={`/channels/${this.props.channel.id}`}>
                <i className="far fa-circle white"></i>&nbsp;{" "}
                {channelDisplayTitle}
              </Link>
            </li>
          );
        }
        
      } else { //if it's not the currently-selected dm
        if (this.props.onlineStatus){ // and the person is online
          return(
            <li className="dm-li">
              <Link to={`/channels/${this.props.channel.id}`}>
                <i className="fas fa-circle"></i>&nbsp;{" "}
                {channelDisplayTitle}
              </Link>
            </li>
          );
        } else { //and the person is not online
          return (
            <li className="dm-li">
              <Link to={`/channels/${this.props.channel.id}`}>
                <i className="far fa-circle gray-dm-li"></i>&nbsp; {channelDisplayTitle}
              </Link>
            </li>
          );
        }
        
        
      }
    }
  }
}

export default ChannelSidebarItem;
