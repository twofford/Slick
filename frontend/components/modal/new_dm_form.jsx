import React from 'react';
import { Redirect } from 'react-router-dom';

class NewDMForm extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            title: '',
            description: '',
            channel_or_dm: 'dm',
            channel_type: 'private',
            users: [],
            searchValue: '',
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);

        this.formatTitle = this.formatTitle.bind(this);
        
    }

    componentDidMount() {
        this.props.clearErrors();
    }

    handleSubmit(event) {

        event.preventDefault();

        this.state.users = [...new Set(this.state.users)];

        this.state.title = this.formatTitle(this.state.users);

        const channel = Object.assign({}, this.state);

        this.props.createChannel(channel).then(channel => {
            if (!this.props.errors.channel) {
                this.props.closeModal();
                // this.props.history.push(`/api/channels/${channel.channel.id}`)
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

        return (
          <div>
            <div id="modal-header">
              <h1 id="new-channel-form-h1">Direct Messages</h1>
              <button id="modal-closer" onClick={() => this.props.closeModal()}>
                &times;
              </button>
            </div>

            <br />

            <div id ="fake-search-box-container">
              <div id="fake-search-box">
                <span id="dm-included-users"></span>

                <input
                  onFocus={() => {
                    document.getElementById("fake-search-box").style = "box-shadow: 0 0 0 4px #bee2f1;"
                  }}
                  onBlur={() => {
                    document.getElementById("fake-search-box").style = "box-shadow: none;"
                  }}
                  id="dm-search-input"
                  type="text"
                  autoComplete="off"
                  placeholder="Find or start a conversation"
                  onChange={this.handleInput("searchValue")}
                />

              </div>
                <button id="search-button" onClick={this.handleSubmit}>
                  Go
                </button>
            </div>

            <ul id="search-results-ul">
              {usersArray.map((user) => {
                if (
                  user.email.toLowerCase().startsWith(this.state.searchValue) &&
                  !this.state.users.includes(user.email) &&
                  this.state.searchValue !== ""
                ) {
                  return (
                    <li
                      id={user.email}
                      key={user.id}
                      onClick={() => {
                        this.state.users.push(user.email);
                        document.getElementById(
                          "dm-included-users"
                        ).innerHTML += user.email;
                        document.getElementById(`${user.email}`).style =
                          "display: none;";
                        document.getElementById("dm-search-input").value = "";
                      }}
                    >
                      {user.email}
                    </li>
                  );
                } else return null;
              })}
            </ul>
            {this.renderErrors()}
          </div>
        );
    }
}

export default NewDMForm;