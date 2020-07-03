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
                
        const channelsArray = Object.values(this.props.channels);

        const filteredChannelsArray = channelsArray.filter(channel => {
            return channel.users.map(user => user.id).includes(currentUserId);
        })
        
        return(
            <div>
                <button id="modal-closer" onClick={() => this.props.closeModal()}>&times;</button>
                <form onSubmit={() => event.preventDefault()}>
                    <input type='text' onChange={this.handleInput('searchValue')}></input>
                </form>
        
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