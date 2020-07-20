import React from 'react';
import MessageItem from './message_item'
import MessageItemContainer from './message_item_container';

export default class MessagesViewport extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchMessages(this.props.currentChannelId);
    }

    render(){

        this.messagesArray = Object.values(this.props.messages)

        this.currentChannelMessages = this.messagesArray.filter(message => message.channel_id == this.props.currentChannelId)

        if (this.props.messages) {
            return (
                <>
                <ul className='messages-ul'>

                    {this.currentChannelMessages.map(message => {
                        return(
                            <MessageItemContainer key={message.id} message={message}/>
                            
                        )
                    })}
                </ul>
                </>
            )
        } else {
            return null;
        }
    }
}