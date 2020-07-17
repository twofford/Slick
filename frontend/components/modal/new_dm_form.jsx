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
        this.state.title = this.formatTitle(this.state.users);
        const channelsArray = Object.values(this.props.channels);
        const channelTitlesArray = channelsArray.map(channel => channel.title);
        if (channelTitlesArray.includes(this.state.title)) {
          const channelIdx = channelTitlesArray.indexOf(this.state.title);
          const channel = channelsArray[channelIdx];
          this.props.history.push(`/channels/${channel.id}`);
          this.props.closeModal();
        } else {
          const channel = Object.assign({}, this.state);
          this.props.createChannel(channel).then((channel) => {
               this.props.history.push(`/channels/${channel.channel.id}`)
               this.props.closeModal();
             });
        }
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

    componentDidUpdate(){
      document.getElementById("dm-search-input").focus();
      const searchButton = document.getElementById("search-button");
      if (this.state.users.length != 0) {
        searchButton.classList.add("enabled-button")
        searchButton.classList.remove("disabled-button")
      } else {
        searchButton.classList.add("disabled-button")
        searchButton.classList.remove("enabled-button")
      }
    }

    render() {
 
        const usersArray = Object.values(this.props.users).filter(user => this.props.currentUser !== user.id);
        
        let inputPlaceholder;

        if (this.state.users.length !== 0) {
          inputPlaceholder = ""
        } else inputPlaceholder = "Find or start a conversation";

        return (
          <div>
            <div id="modal-header">
              <h1 id="new-dm-form-h1">Direct Messages</h1>
              <button id="modal-closer" onClick={() => this.props.closeModal()}>
                &times;
              </button>
            </div>

            <div id ="fake-search-box-container">
              <div id="fake-search-box">
              <span id="dm-included-users">
                {this.state.users.map((user, index) => {
                  return <span key={index} className="user-tag"><img className="avatar" src={avatar}></img><span className="dm-user-name">{user}</span><button className="dm-button" onClick={() => {
                    const usersCopy = [...this.state.users];
                    const toBeDeletedIndex = usersCopy.indexOf(user);
                    usersCopy.splice(toBeDeletedIndex, 1);
                    this.setState(
                      {users: usersCopy}
                    )
                  }}>
                      X</button></span>
                })}
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
                    autoFocus
                    placeholder={inputPlaceholder}
                    onChange={this.handleInput("searchValue")}
                  />
              </span>

              </div>
                <button id="search-button" className="disabled-button" onClick={this.handleSubmit}>
                  Go
                </button>
            </div>

            <ul id="search-results-ul">
              
              {usersArray.map((user) => {
                if (
                  user.email.toLowerCase().startsWith(this.state.searchValue) &&
                  !this.state.users.includes(user.email) 
                  && this.state.searchValue !== ""
                ) {
                  return (
                    <li
                      id={user.email}
                      key={user.id}
                      onClick={() => {
                        this.setState(state => {
                          const newUsers = state.users.concat(user.email);
                          return {users: newUsers, searchValue: ''};
                        })

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