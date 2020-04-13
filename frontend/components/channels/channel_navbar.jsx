import React from 'react';
import ChannelItem from './channel_item';

class ChannelNavbar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            title: '',
            channel_type: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);

    };

    componentDidMount(){
        this.props.fetchChannels();
    }

    handleInput(type) {
        return (event) => {
            this.setState({ [type]: event.target.value });
        };
    };

    handleSubmit(event) {

        event.preventDefault();
        const channel = Object.assign({}, this.state);
        this.props.createChannel(channel);

    };

    render(){

        this.channelsArray = Object.values(this.props.channels);


        return(
            <div>
                <p>Channels</p>
                <ul>
                    {this.channelsArray.map(channel =>(
                        <ChannelItem
                            channel={channel}
                        />
                    ))}
                </ul>
            <form>
                <label>Title:
                <input
                    type="text"
                    onChange={this.handleInput('title')}
                />
                </label>

                <label>Channel type:
                <input
                    type="text"
                    onChange={this.handleInput('channel_type')}
                />

                <button
                    onClick={this.handleSubmit}>
                        Submit
                </button>
                </label>
            </form>
            </div>
    )
    }
}

export default ChannelNavbar;