import React from 'react';

export default class NewMessageForm extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            body: ''
            // channel_id: '',
            // user_id: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(type) {
        return (event) => {
            this.setState({ [type]: event.target.value });
        };
    };

    handleSubmit(event) {

        // debugger
        event.preventDefault();

        this.setState({['channel_id']: parseInt(this.props.currentChannelId), ['user_id']: this.props.currentUser.id})

        // debugger

        const message = Object.assign({}, this.state);

        this.props.createMessage(message);

        // debugger
    };

    render(){
        return(
            <form
            onSubmit={this.handleSubmit}>
                <input
                type="text"
                onChange={this.handleInput('body')}/>
                <input type="hidden"/>
            </form>
        )
    }
}