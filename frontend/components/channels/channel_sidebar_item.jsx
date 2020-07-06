import React from 'react';
import {Link} from 'react-router-dom';

class ChannelSidebarItem extends React.Component{
    constructor(props){
        super(props);
    };

    render(){

        if (this.props.channel.channel_type === 'public'){

            if (this.props.currentChannelId == this.props.channel.id){
                return (
                    <li className='channel-li-current'>
                        
                        <Link to={`/channels/${this.props.channel.id}`}># {this.props.channel.title}</Link>
                    </li>
                )
            } else {
        
                return (
                    <li className='channel-li'>
                        
                        <Link to={`/channels/${this.props.channel.id}`}># {this.props.channel.title}</Link>
                    </li>
                )}

        } else {

            let channelDisplayTitleArray = this.props.channel.title.split(",");

            channelDisplayTitleArray.splice(channelDisplayTitleArray.indexOf(this.props.currentUser.email),1);

            const channelDisplayTitle = channelDisplayTitleArray.join(", ");

            
            if (this.props.currentChannelId == this.props.channel.id) {
                return (
                    <li className='dm-li-current'>
                        
                        <Link to={`/channels/${this.props.channel.id}`}><i className="fas fa-circle white"></i>&nbsp; {channelDisplayTitle}</Link>
                    </li>
                )
            } else {

                return (
                <li className='dm-li'>
                    
                        <Link to={`/channels/${this.props.channel.id}`}><i className="fas fa-circle"></i>&nbsp; {channelDisplayTitle}</Link>
                </li>
        )}
        }
    }
}

export default ChannelSidebarItem;