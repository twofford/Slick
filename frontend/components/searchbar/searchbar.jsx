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

        const filteredChannelsArray = Object.values(this.props.channels).filter(channel => {
            return channel.users.map(user => user.id).includes(currentUserId)
            }).sort((a,b) => {
            const aTitle = a.title.toUpperCase();
            const bTitle = b.title.toUpperCase();
            if (aTitle < bTitle) {
                return -1;
            } else if (aTitle > bTitle) {
                return 1;
            } else return 0;
        });

        const filteredMessagesArray = Object.values(this.props.messages).filter(message => {
            return filteredChannelsArray.map(channel => channel.id).includes(message.channel_id);
        });


        const placeholderMessages = [
            "Search for something. Anything. You have the window open now anyway.",
            "Search the Log of All Conversation and Knowledge",
            "Search all across Slick",
            "Surely that's around here somewhere...",
            "What do you want to search for today?",
            "Delve into your archives, seize upon the answers. Rejoice.",
            "Type what you want to search for. Slick will do the rest.",
            "Input search. Beep boop."
        ]

        const randomNum = (max) => {
            return Math.floor(Math.random() * max + 1)
        }

        const placeholderText = placeholderMessages[randomNum(placeholderMessages.length - 1)]
        
        return(
                <>
                <form id="search-form" onSubmit={() => event.preventDefault()}>
                    <i className="fas fa-search gray"></i>
                    <input id="search-input" placeholder={placeholderText} type='text' onChange={this.handleInput('searchValue')}></input>
                    <a className="search-modal-closer" onClick={() => this.props.closeModal()}>&times;</a>
                </form>
        
                <ul>
                    {filteredChannelsArray.map(channel => {

                        let prefix;

                        if (channel.channel_or_dm === 'channel') {
                            if (channel.channel_type === 'public') {
                                prefix = '#';
                            } else prefix = <i className="fas fa-lock"></i>;
                        } else prefix = '#';

                        if (channel.title.toLowerCase().startsWith(this.state.searchValue) && this.state.searchValue != "") {
                            return (
                                <Link
                                onClick={() => this.props.closeModal()}
                            className="search-li" to={`/channels/${channel.id}`}>{prefix}{channel.title}<br></br></Link>
                            )} else return null;
                    })}
                </ul>
                <ul>
                    {filteredMessagesArray.map(message => {

                        const messageUser = this.props.users[message.user.id]

                        const messageChannel = this.props.channels[message.channel_id];

                        if (message.body.toLowerCase().startsWith(this.state.searchValue) && this.state.searchValue != "") {
                            return (
                            <Link onClick={() => this.props.closeModal()} className="search-li" to={`/channels/${message.channel_id}`}>{messageUser.email}: "{message.body}" -- in {messageChannel.title}<br></br></Link>
                            )
                        } else return null;
                    })}
                </ul>
                </>
        )
    }

}