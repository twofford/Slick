import React from 'react';
import MessagesViewportContainer from '../messages/messages_viewport_container';

class Channel extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        // debugger
        if (this.props.channel) {
            return (
            <div className='messages-wrapper'>
                <div className='messages-header'>
                    <div className='messages-header-left'>
                        <div className='channel-title'># &nbsp; {this.props.channel.title}
                            <i class="far fa-star"></i>
                        </div>
        
                            <div className='subs-pins-addtopic'>
                                <i class="far fa-user">79</i>
                                <i class="fas fa-thumbtack">10</i>
                                <span>Add a topic</span>
                            </div>
                    </div>
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