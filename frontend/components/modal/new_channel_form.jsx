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

                    <p>Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.</p>
                    
                    <div>Name
                        
                        <br/>
                    
                        <input type="text" onChange={this.handleInput('title')} placeholder="# e.g. plan-budget"/>
                    
                    </div>

                    <div>Description
                        
                        <span> (optional)</span>
                        
                        <br/>
                        
                        <input type="text" onChange={this.handleInput('description')} />
                        
                        <span id="description-span">What's this channel about?</span>
                        
                    </div>


                    <div id="modal-footer">
                        
                        <div>

                            <h4>Make private</h4>

                            <div id="private-description">When a channel is set to private, it can only be viewed or joined by invitation.</div>

                        </div>

                        <div id="switch-div">
                    
                            <label className="switch">
                                
                                <input type="checkbox" onChange={this.handleInput('channel_type')} />

                                <span className="slider round"></span>

                            </label>

                        </div>
                    
                    </div>
                        
                </div>

                    <button className="disabled-button" id="new-channel-submit-button" onClick={this.handleSubmit}>Create</button>

                </div>

            
            


            




            
        )
    }
}

export default NewChannelForm;