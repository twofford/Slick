import React from 'react';
import MessagesViewportContainer from '../messages/messages_viewport_container';

class Channel extends React.Component{
    constructor(props){
        super(props)

        this.currentChannel = this.props.fetchChannel(this.props.match.params.channelId)
    }

    render(){
        // debugger
        if (this.props.channel) {
            return (
            <>
            <h1>{this.props.channel.title}</h1>
            <MessagesViewportContainer/>
            </>
            )
        } else {
            return null
        }
    }
}

export default Channel;