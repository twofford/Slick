import React from 'react';
import ChannelSidebarItem from './channel_sidebar_item';

class ChannelSidebar extends React.Component{
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
    };

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

    hideChannels() {
        const channelsUl = document.getElementById("channels-ul");

        if (channelsUl.style.display === "none") {
            channelsUl.style.display = "block";
        } else {
            channelsUl.style.display = "none";
        }
    };

    hideDms() {
        const dmsUl = document.getElementById("dms-ul");

        if (dmsUl.style.display === "none") {
            dmsUl.style.display = "block";
        } else {
            dmsUl.style.display = "none";
        }
    };

    render(){

        this.channelsArray = Object.values(this.props.channels);

        return(

            <div className='channels-wrapper'>

                <div className='channels-toogle'>

                    <i id='channels-carat' className="fas fa-caret-right"></i>
                    
                    <button className='channels-toggle-button'
                    onClick={this.hideChannels}>Channels</button>

                    <ul id='channels-ul' className='channels-ul'>

                        {this.channelsArray.map(channel => {

                            if (channel.channel_type === 'public') {
                                return <ChannelSidebarItem 
                                key={channel.id}
                                channel={channel} currentChannelId={this.props.currentChannelId}/>
                        }})}

                    </ul>

                </div>

                <div className='channels-toogle'>

                    <i id='channels-carat' className="fas fa-caret-right"></i>

                    <button className='dms-toggle-button'
                        onClick={this.hideDms}>Direct messages</button>

                    <ul id='dms-ul' className='dms-ul'>

                        {this.channelsArray.map(channel => {

                            if (channel.channel_type === 'private') {
                                return <ChannelSidebarItem
                                key={channel.id}
                                channel={channel} currentChannelId={this.props.currentChannelId} />
                            }
                        })}

                    </ul>

                </div>

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

                <button className='logout-button' onClick={this.props.logout}>Log out</button>

            </form>
            </div>

    )
    }
}

export default ChannelSidebar;