import React from 'react';

class NewChannelForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            description: '',
            channel_type: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);

    };

    handleInput(type) {
        return (event) => {
            this.setState({ [type]: event.target.value });
        };
    };

    handleSubmit(event) {
        event.preventDefault();
        const channel = Object.assign({}, this.state);
        this.props.createChannel(channel);
        this.props.closeModal()
    };

    render() {
        return(
            <div>
                <div id="modal-header">
                    <h1 id="new-channel-form-h1">Create a channel</h1>
                    <button id="modal-closer" onClick={() => this.props.closeModal()}>&times;</button>
                </div>
                <div id="modal-body">
                    <span>Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.</span>
                </div>

            
            
            <label>Name</label>

            <input type="text" onChange={this.handleInput('title')}/>

            <label>Description (optional)</label>
            
            <input type="text" onChange={this.handleInput('description')}/>

            <span>What's this channel about?</span>

            <label>Make private</label>

            <input type="text" onChange={this.handleInput('channel_type')}/>

            <button onClick={this.handleSubmit}>Submit</button>

            </div>
        )
    }
}

export default NewChannelForm;