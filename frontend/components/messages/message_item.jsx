import React from 'react';

export default class MessageItem extends React.Component{
    constructor(props){

        super(props)

        this.getDate = this.getTimestamp.bind(this);

        this.state = {
            id: this.props.message.id,
            channel_id: this.props.message.channel_id,
            body: "",
            user_id: this.props.message.user.id
        }

        this.handleSubmit = this.handleSubmit.bind(this);

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

    handleInput(type) {
        return (event) => {
            this.setState({
                [type]: event.target.value
            })
        }
    }

    handleSubmit(event) {

        console.log(this.props.message);

        console.log(this.state);

        event.preventDefault();

        const newMessage = Object.assign({}, this.state);

        this.props.updateMessage(newMessage).then((res) => {
          App.cable.subscriptions.subscriptions[0].speak({
            message: res.message,
          });
        });;
    }

    render(){
        return(
            
            <div className='message-wrapper'>
                <div>
                    <form>
                        <input
                            type="text"
                            placeholder={this.state.body}
                            onChange={this.handleInput('body')}
                        />
                        <button
                            onClick={this.handleSubmit}
                        >Update your message</button>
                    </form>
                    {/* <i class="fas fa-user"></i> */}
                    <img className='message-avatar' src={avatar}/>
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