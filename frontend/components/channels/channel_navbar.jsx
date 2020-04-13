import React from 'react';

class ChannelNavbar extends React.Component{
    constructor(props){
        super(props);

        this.channelsArray = Object.values(this.props.channels)

        this.state = {
            title: '',
            channel_type: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);

    };

    handleInput(type) {
        // debugger
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
        return(
            <div>
                {this.channelsArray.map(channel =>(
                    <p>{channel.channels.title}</p>
                ))}
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