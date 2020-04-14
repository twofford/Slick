import React from 'react';

class ChannelSidebarItem extends React.Component{
    constructor(props){
        super(props);
    };

    render(){

        if (this.props.channel.channel_type === 'public'){
        
        return(
            <li className='channel-li'>
                <span className='channel-hash'># &nbsp;</span>
                {this.props.channel.title}
            </li>
        )
        } else {
            return (
            <li className='dm-li'>
                <span className='channel-hash'># &nbsp;</span>
                {this.props.channel.title}
            </li>
        )
        }
    }
}

export default ChannelSidebarItem;