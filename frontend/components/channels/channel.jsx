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
                },

                hear: function() {
                    return this.perform('hear')
                }
            }
        );
    }

    render(){
        
        if (this.props.channel) {

            if (this.props.channel.channel_or_dm === "channel") {
            return (

                <div className='channel-wrapper'>

                    <div className='channel-header'>

                        <div className='channel-header-left'>

                            <p className='channel-title'>
                                
                                    <strong>#{this.props.channel.title}</strong>
                                    
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                    <i className="far fa-star"></i>

                            </p>

                            <p className='subs-pins-addtopic'>

                                <i className="far fa-user"> </i>
                                
                                &nbsp;
                                        
                                {this.props.channel.users.length}

                                &nbsp; | &nbsp;
                                        
                                {this.props.channel.description}
                            </p>

                        </div>

                        <div className='channel-header-right'>

                        </div>
                        
                    </div>
                    
                    <MessagesViewportContainer/>
                    <NewMessageFormContainer/>
                </div>
            )
            } else {

                let channelDisplayTitleArray = this.props.channel.title.split(",");

                channelDisplayTitleArray.splice(channelDisplayTitleArray.indexOf(this.props.currentUser.email), 1);

                const channelDisplayTitle = channelDisplayTitleArray.join(", ");

                return (
                    <div className='channel-wrapper'>

                        <div className='channel-header'>

                            <div className='channel-header-left'>

                                <p className='dm-title'>

                                    <i className="fas fa-circle green">&nbsp;&nbsp;</i>{channelDisplayTitle}

                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                    <i className="far fa-star"></i>

                                </p>

                            </div>

                            <div className='channel-header-right'>

                            </div>

                        </div>

                        <MessagesViewportContainer />
                        <NewMessageFormContainer />
                    </div>
                )
            }
        } else {
            return null
        }
    }
}

export default Channel;