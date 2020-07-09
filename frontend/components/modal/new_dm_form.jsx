import React from 'react';

class NewDMForm extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            title: '',
            description: '',
            channel_or_dm: 'dm',
            channel_type: 'private',
            users: [],
            searchValue: ''
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);

        this.formatTitle = this.formatTitle.bind(this);

        // this.selectUser = this.selectUser.bind(this);
        
    }

    componentDidMount() {
        this.props.clearErrors();
    }

    // selectUser(userEmail) {
    //     this.state.users.push(userEmail);
    //     const dmIncludedUsers = document.getElementById("dm-included-users");
    //     const userTag = document.createElement("span");
    //     userTag.innerHTML = userEmail;
    //     dmIncludedUsers.append(userTag);
    //     const target = document.getElementById(userEmail);
    //     target.parentNode.removeChild(target);
    //     document.getElementById("dm-search-input").value = "";
    // }

    handleSubmit(event) {
        event.preventDefault();

        this.state.users = [...new Set(this.state.users)];

        this.state.title = this.formatTitle(this.state.users);

        const channel = Object.assign({}, this.state);

        this.props.createChannel(channel).then(() => {
            if (!this.props.errors.channel) {
                this.props.closeModal();
            }
        });
    }

    handleInput(type) {
        return (event) => {
            this.setState({
                [type]: event.target.value,
            });
        };
    };

    formatTitle(users) {
        if (users.length > 0) {
            const allUsers = users.concat(this.props.users[this.props.currentUser].email);
            return allUsers.sort().join(", ")
        } else return this.state.title;
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
 
        const usersArray = Object.values(this.props.users).filter(user => this.props.currentUser !== user.id);

        return(
            <div>
                <div id="modal-header">
                    <h1 id="new-channel-form-h1">Direct Messages</h1>
                    <button id="modal-closer" onClick={() => this.props.closeModal()}>&times;</button>
                </div>

                <br/>

                <span id="fake-search-box">

                    <span id="dm-included-users"></span>

                    <input id="dm-search-input"
                    type="text"
                    placeholder="Find or start a conversation"
                    onChange={this.handleInput('searchValue')}/>

                </span>

                <button onClick={this.handleSubmit}>Go</button>

                <ul id="search-results-ul">
                    {usersArray.map(user => {
                        if (user.email.toLowerCase().startsWith(this.state.searchValue) && !this.state.users.includes(user.email) && this.state.searchValue !== "") {
                            
                            return (
                            <li id={user.email} key={user.id}
                            onClick={() => {
                                this.state.users.push(user.email);
                                document.getElementById("dm-included-users").innerHTML += user.email;
                                document.getElementById(`${user.email}`).style = "display: none;";
                                document.getElementById("dm-search-input").value = "";
                            }}>{user.email}</li>
                            )
                        } else return null;
                    })}
                </ul>
                {this.renderErrors()}
                
                {/* <div>These users are in the DM
                <ul id="users-in-dm-ul" onClick={(e) => {
                    const usersNotInDMUl = document.getElementById("users-not-in-dm-ul");
                    const target = e.target;
                    target.parentNode.removeChild(target);
                    usersNotInDMUl.appendChild(target);
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
                {this.renderErrors()} */}

            </div>
        )
    }
}

export default NewDMForm;