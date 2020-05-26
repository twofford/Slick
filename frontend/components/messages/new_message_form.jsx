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

        //this calls the speak function, passing in an object with key message and value this.state -- this.state is whatever the user entered into the text input

        // App.cable.subscriptions.subscriptions[0].speak({message: this.state});
        
        const message = Object.assign({}, this.state);

        //this puts a message in frontend state and persists a message to the database
        this.props.createMessage(message).then((res) => {
            App.cable.subscriptions.subscriptions[0].speak({ message: res.message });
        });

        $('#message-form')[0].reset();
        
    };

    render(){

        const placeholder = `Message #${this.props.channel.title}`;

        return(
            // <div className='message-form-container'>
            
            /* <div className='message-form-inner-container'> */

            <form id='message-form' className='message-form'
            onSubmit={this.handleSubmit}>
                <input
                className='message-form-input'
                placeholder={placeholder}
                type="text"
                onChange={this.handleInput('body')}/>
            </form>
            // </div>
            // </div>
        )
    }
}