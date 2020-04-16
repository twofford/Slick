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

    handleInput(type) {
        return (event) => {
            this.setState({ [type]: event.target.value });
        };
    };

    handleSubmit(event) {

        // debugger
        event.preventDefault();
        
        const message = Object.assign({}, this.state);

        this.props.createMessage(message);
        
        // this.setState({
        //     ['channel_id']: parseInt(this.props.currentChannelId),
        //     ['user_id']: this.props.currentUser.id
        // }, () => {
        // })

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