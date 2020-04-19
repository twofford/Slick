import React from 'react';

export default class NewMessageForm extends React.Component{

    constructor(props){
        super(props)

        this.state = {

            body: '',
            channel_id: parseInt(this.props.currentChannelId),
            user_id: this.props.currentUser.id
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    // componentDidUpdate(){
    //     this.state = Object.assign(this.state, {
    //         channel_id: parseInt(this.props.currentChannelId),
    //         user_id: this.props.currentUser.id
    //     });
    // }

    handleInput(type) {
        return (event) => {
            this.setState({ [type]: event.target.value });
        };
    };

    handleSubmit(event) {

        // debugger

        event.preventDefault();

        App.cable.subscriptions.subscriptions[0].speak({message: this.state});

        console.log({message: this.state});

        // this.setState({body: ''});
        
        const message = Object.assign({}, this.state);

        this.props.createMessage(message);

        $('#message-form')[0].reset();
        
    };

    render(){
        return(
            <div className='message-form-container'>
            <div className='message-form-inner-container'>
            <form id='message-form' className='message-form'
            onSubmit={this.handleSubmit}>
                <input
                className='message-form-input'
                placeholder='Message goes here'
                type="text"
                onChange={this.handleInput('body')}/>
            </form>
            </div>
            </div>
        )
    }
}