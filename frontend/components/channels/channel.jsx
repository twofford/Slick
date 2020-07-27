import React from 'react';
import MessagesViewportContainer from '../messages/messages_viewport_container';
import NewMessageFormContainer from '../messages/new_message_form_container';

class Channel extends React.Component{
    constructor(props){
        super(props)
        this.state = {messages : []};
    }

    componentDidMount(){
        
        App.cable.subscriptions.create(
            {channel: 'ChatChannel'},
            {
                received: data => {
                    console.log('Received on ChatChannel:',data)
                    this.props.receiveMessage(data)
                },
                speak: function(data){
                    console.log('Spoken on ChatChannel:',data)
                    this.perform('speak',data)
                }
            }
        );

        // App.cable.subscriptions.create(
        //     {channel: 'AppearanceChannel'},
        //     {
        //        received: data => {
        //         //    console.log('Received on AppearanceChannel:',data)
        //            if (data.online) {
        //                this.props.receiveNewUser(data.user)
        //            } else {
        //                this.props.logoutNewUser(data.user)
        //            }
        //         },
        //        speak: function(data){
        //         //    console.log('Spoken on AppearanceChannel:',data)
        //            this.perform('speak',data)} 
        //     }
        // )

        // App.cable.subscriptions.subscriptions[1].speak({user: {user: this.props.currentUser, online: true}});
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

                const channelDisplayTitleArray = this.props.channel.title.split(
                  ", "
                );

                const channelDisplayTitleArrayFiltered = channelDisplayTitleArray.filter(
                  (user) => user !== this.props.currentUser.email
                );

                const channelDisplayTitle = channelDisplayTitleArrayFiltered.join(
                  ", "
                );

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