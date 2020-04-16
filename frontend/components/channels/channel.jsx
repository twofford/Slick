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
            <div className='messages-wrapper'>
                <div className='messages-header'>
                        <span className='channel-title'>#{this.props.channel.title}</span>
                </div>
                
                <MessagesViewportContainer/>
            </div>
            )
        } else {
            return null
        }
    }
}

export default Channel;