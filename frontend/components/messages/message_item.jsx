import React from 'react';

export default class MessageItem extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        // debugger
        return(
            <div className='message-wrapper'>
                <li>{this.props.message.user.email}:</li>
                <li>{this.props.message.created_at}</li>
                <li>{this.props.message.body}</li>
            </div>
        )
    }
}