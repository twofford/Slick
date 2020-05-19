import React from 'react';
import MessageItem from './message_item'
import NewMessageFormContainer from './new_message_form_container';

export default class MessagesViewport extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchMessages(this.props.currentChannelId);
    }

    render(){

        // debugger

        this.messagesArray = Object.values(this.props.messages)

        this.currentChannelMessages = this.messagesArray.filter(message => message.channel_id == this.props.currentChannelId)

        if (this.props.messages) {
            return (
                <>
                <ul className='messages-ul'>

                    {this.currentChannelMessages.map(message => {
                        return(
<<<<<<< HEAD
                            <MessageItem key={message.id} message={message}/>
=======
                            <div>Hi</div>
                            // <MessageItem key={message.id} message={message}/>
>>>>>>> master
                            
                        )
                    })}
                </ul>
                <NewMessageFormContainer/>
                </>
            )
        } else {
            return <div>This is the messages viewport</div>;
        }
    }
}