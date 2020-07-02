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
                
        this.usersArray = Object.values(this.props.users);

        this.filteredUsersArray = this.usersArray.filter(user =>
            user.id != this.props.users[this.props.currentUser.id].id
        ).sort()

        this.channelsArray= Object.values(this.props.channels)

        this.publicChannelsArray = this.channelsArray.filter(channel => 
        channel.channel_type === 'public'
        ).sort()
        
        return(
            <div>
                <form onSubmit={() => event.preventDefault()}>
                    <input type='text' onChange={this.handleInput('searchValue')}></input>
                </form>
                <ul>People
                    {this.filteredUsersArray.map(user => {
                        if (user.email.toLowerCase().startsWith(this.state.searchValue)) {
                        return <li>{user.email}</li>
                        } else return null;
                    })}
                </ul>
                <ul>Channels
                    {this.publicChannelsArray.map(channel => {
                        if (channel.title.toLowerCase().startsWith(this.state.searchValue)) {
                            return <li><Link to={`/channels/${channel.id}`}>{channel.title}</Link></li>
                        } else return null;
                    })}
                </ul>
            </div>
        )
    }

}