import React from 'react';

class ChannelItem extends React.Component{
    constructor(props){
        super(props);
    };

    render(){
        
        return(
            <li>
                <p>{this.props.channel.title}</p>
            </li>
        )
    }
}

export default ChannelItem;