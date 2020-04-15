import React from 'react';

class Channel extends React.Component{
    constructor(props){
        super(props)

        this.currentChannel = this.props.fetchChannel(this.props.match.params.channelId)
    }

    // componentDidMount(){
    //     this.props.fetchChannel(this.props.match.params.channelId);
    // }

    render(){
        // debugger
        if (this.props.channel) {
            return (
            <h1>{this.props.channel.title}</h1>
            )
        } else {
            return null
        }
    }
}

export default Channel;