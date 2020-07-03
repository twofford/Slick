import React from 'react';
import { Link } from 'react-router-dom';

export default class Searchbar extends React.Component {
    constructor(props){
        super(props)

        this.state = { searchValue: '' }

    }

    handleInput(type) {
        return (event) => {
            this.setState({
                [type]: event.target.value,
            });
        };
    };


    render(){

        const currentUserId = this.props.currentUser.id
                
        // this.usersArray = Object.values(this.props.users);

        // this.filteredUsersArray = this.usersArray.filter(user =>
        //     user.id != this.props.users[this.props.currentUser.id].id
        // ).sort()

        const channelsArray = Object.values(this.props.channels);

        const filteredChannelsArray = channelsArray.filter(channel => {
            return channel.users.map(user => user.id).includes(currentUserId);
        })

        // this.publicChannelsArray = this.channelsArray.filter(channel => 
        // channel.channel_type === 'public'
        // ).sort()

        //can you only use the channels array? just return all channels, public and private?
        
        return(
            <div>
                <button id="modal-closer" onClick={() => this.props.closeModal()}>&times;</button>
                <form onSubmit={() => event.preventDefault()}>
                    <input type='text' onChange={this.handleInput('searchValue')}></input>
                </form>
                {/* <ul>People
                    {this.filteredUsersArray.map(user => {
                        if (user.email.toLowerCase().startsWith(this.state.searchValue)) {
                        return <li>{user.email}</li>
                        } else return null;
                    })}
                </ul> */}
                <ul>Channels
                    {filteredChannelsArray.map(channel => {
                        if (channel.title.toLowerCase().startsWith(this.state.searchValue)) {
                            return <li onClick={() => this.props.closeModal()}><Link to={`/channels/${channel.id}`}>{channel.title}</Link></li>
                        } else return null;
                    })}
                </ul>
            </div>
        )
    }

}