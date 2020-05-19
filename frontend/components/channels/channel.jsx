import React from 'react';
import MessagesViewportContainer from '../messages/messages_viewport_container';
import NewMessageFormContainer from '../messages/new_message_form_container';

import {receiveMessage} from '../../actions/message_actions';

class Channel extends React.Component{
    constructor(props){
        super(props)
        this.state = {messages : []};
        this.bottom = React.createRef();
    }

    componentDidMount(){
        
        App.cable.subscriptions.create(
            {channel: 'ChatChannel'},
            {
                received: data => {
                    dispatch(receiveMessage(data));
                },

                speak: function(data) {
                    return this.perform('speak', data);
                },

                load: function() {
                    return this.perform('load')
                }
            }
        );
    }

    render(){
        // debugger
        return (
            <div>
              <MessagesViewportContainer messages ={this.state}/>
              <NewMessageFormContainer/>  
            </div>
        )
    }


    render(){
        if (this.props.channel) {
            return (
            <div className='messages-wrapper'>
                <div className='messages-header'>
                    <div className='messages-header-left'>
                        <div className='channel-title'># &nbsp; {this.props.channel.title}
                            <i className="far fa-star"></i>
                        </div>
        
                            <div className='subs-pins-addtopic'>
                                <i className="far fa-user"><span className='subs-pins-addtopic-text'>&nbsp;{this.props.channel.users.length}</span></i>
                                <i className="far fa-flag"><span className='subs-pins-addtopic-text'>&nbsp;10</span></i>
                                <span className='subs-pins-addtopic-text'>Add a topic</span>
                            </div>
                    </div>

                    <div className='messages-header-right'>
                            <i className="far fa-question-circle"></i>
                            <span>&nbsp;Details</span>
                    </div>
                </div>
                
                <MessagesViewportContainer/>
                {/* <NewMessageFormContainer/> */}
            </div>
            )
        } else {
            return null
        }
    }
}

export default Channel;