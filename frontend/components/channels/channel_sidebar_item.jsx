import React from 'react';

class ChannelSidebarItem extends React.Component{
    constructor(props){
        super(props);
    };

    render(){
        
        return(
            <li className='channel-li'>
                <span className='channel-hash'># &nbsp;</span>
                {this.props.channel.title}
            </li>
        )
    }
}

export default ChannelSidebarItem;