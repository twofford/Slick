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
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formatTitle = this.formatTitle.bind(this);
    }

    componentDidMount() {
        this.props.clearErrors();
    }

    componentWillUnmount(){
        this.props.clearErrors();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.state.title = this.formatTitle(this.state.users);
        this.state.users = [...new Set(this.state.users)];
        const channel = Object.assign({}, this.state);
        this.props.createChannel(channel);
        // debugger
        this.props.clearErrors();
    }

    formatTitle(users) {
        if (users.length > 0) {
            return users.join(", ");
        } else return users[0] || this.state.title;
    }

    renderErrors() {
        return (
            <ul>
                {this.props.errors.map((error, i) => (
                    <li className='error' key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
 
        this.usersArray = Object.values(this.props.users);

        this.usersArray = this.usersArray.filter(user => this.props.currentUser !== user.id);

        return(
            <div>
                <div id="modal-header">
                    <h1 id="new-channel-form-h1">Direct Messages</h1>
                    <button id="modal-closer" onClick={() => this.props.closeModal()}>&times;</button>
                </div>
                
                <div>These users are in the DM
                <ul id="users-in-dm-ul" onClick={(e) => {
                    // const usersNotInDMUl = document.getElementById("users-not-in-dm-ul");
                    // const target = e.target;
                    // target.parentNode.removeChild(target);
                    // usersNotInDMUl.appendChild(target);
                }}>

                </ul>
                </div>

                <div>These users are not in the DM
                <ul id="users-not-in-dm-ul" onClick={(e) => {
                    const usersInDMUl = document.getElementById("users-in-dm-ul");
                    const target = e.target;
                    target.parentNode.removeChild(target);
                    usersInDMUl.appendChild(target);
                }}>
                    {this.usersArray.map(
                        user => {
                        return <li onClick={ () => {
                            if (!this.state.users.includes(user.email)) {
                                this.state.users.push(user.email);
                            }
                        }}>{user.email}</li>
                        }
                    )}
                </ul>
                </div>
                
                <button onClick={this.handleSubmit}>Submit</button>
                {this.renderErrors()}
            </div>
        )
    }
}

export default NewDMForm;