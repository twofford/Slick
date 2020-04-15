import React from 'react';
import {Link} from 'react-router-dom';

class ChannelSidebarItem extends React.Component{
    constructor(props){
        super(props);
    };

    render(){

        // debugger

        if (this.props.channel.channel_type === 'public'){

            if (this.props.currentChannelId == this.props.channel.id){
                return (
                    <li className='channel-li-current'>
                        <span className='channel-hash'># &nbsp;</span>
                        <Link to={`/channels/${this.props.channel.id}`}>{this.props.channel.title}</Link>
                    </li>
                )
            } else {
        
                return (
                    <li className='channel-li'>
                        <span className='channel-hash'># &nbsp;</span>
                        <Link to={`/channels/${this.props.channel.id}`}>{this.props.channel.title}</Link>
                    </li>
                )}

        } else {

            // debugger

            if (this.props.currentChannelId == this.props.channel.id) {
                return (
                    <li className='dm-li-current'>
                        <span className='channel-hash'># &nbsp;</span>
                        <Link to={`/channels/${this.props.channel.id}`}>{this.props.channel.title}</Link>
                    </li>
                )
            } else {

                return (
                <li className='dm-li'>
                    <span className='channel-hash'># &nbsp;</span>
                        <Link to={`/channels/${this.props.channel.id}`}>{this.props.channel.title}</Link>
                </li>
        )}
        }
    }
}

export default ChannelSidebarItem;