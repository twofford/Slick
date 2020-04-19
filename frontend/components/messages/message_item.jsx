import React from 'react';

export default class MessageItem extends React.Component{
    constructor(props){

        super(props)

        this.getDate = this.getTimestamp.bind(this);

    }

    getTimestamp() {

        const timestamp = new Date(this.props.message.created_at)

        let hours = timestamp.getHours();

        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;

        hours = hours ? hours : 12;

        let minutes = timestamp.getMinutes();

        minutes = minutes < 10 ? '0' + minutes : minutes;

        const timeStr = hours + ':' + minutes + ' ' + ampm;

        return timeStr;

    }


    render(){
        // debugger
        return(
            <div className='message-wrapper'>
                <div>
                    <img className='message-avatar' src={avatar}/>
                    {/* <i className="far fa-user avatar"></i> */}
                </div>
                <div className='message-container'>
                    <div className='username-timestamp'>
                    <div className='username'>
                        {this.props.message.user.email}
                    </div>
                    <div className='timestamp'>
                        {this.getTimestamp()}
                    </div>
                    </div>
                    <div className='message'>
                        {this.props.message.body}
                    </div>
                </div>
            </div>
        )
    }
}