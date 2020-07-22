import React from 'react';

export default class NewMessageForm extends React.Component{

    constructor(props){

        super(props)

        this.state = {

            body: '',
            channel_id: parseInt(this.props.currentChannelId),
            user_id: this.props.currentUser.id,
            user: this.props.currentUser
        
        };

        this.handleSubmit = this.handleSubmit.bind(this); 

    }

    handleInput(type) {
        return (event) => {
            this.setState({
                [type]: event.target.value, 
                channel_id: parseInt(this.props.currentChannelId) });
        };
    };

    handleSubmit(event) {

        event.preventDefault();

        if (this.state.body !== "") {

            const message = Object.assign({}, this.state);

            this.props.createMessage(message).then((res) => {
              App.cable.subscriptions.subscriptions[0].speak({
                message: res.message,
              });
            });

            $("#message-form")[0].reset();

            this.setState({
                body: ''
            })

        }
    };

    render(){

        let placeholder;

        if (this.props.channel.channel_or_dm === 'channel') {
            placeholder = `Message #${this.props.channel.title}`;
        } else {
            let channelDisplayTitleArray = this.props.channel.title.split(",");

            channelDisplayTitleArray.splice(channelDisplayTitleArray.indexOf(this.props.currentUser.email), 1);

            const channelDisplayTitle = channelDisplayTitleArray.join(", ");

            placeholder = `Message${channelDisplayTitle}`;
        }

        return(
            <div className='message-form-container'>

            <form id='message-form' className='message-form'
            onSubmit={this.handleSubmit}>
                <input
                className='message-form-input'
                placeholder={placeholder}
                type="text"
                onChange={this.handleInput('body')}/>
                <i className="fas fa-paper-plane"></i>
            </form>
            </div>

        )
    }
}