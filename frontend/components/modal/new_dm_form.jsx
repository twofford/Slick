import React from 'react';

class NewDMForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            description: '',
            channel_type: 'private',
            users: []
        }
        //bindings go here
    }

    render() {
        return(
            <div>
                <div id="modal-header">
                    <h1 id="new-channel-form-h1">Create a channel</h1>
                    <button id="modal-closer" onClick={() => this.props.closeModal()}>&times;</button>
                </div>
            </div>
        )
    }
}

export default NewDMForm;