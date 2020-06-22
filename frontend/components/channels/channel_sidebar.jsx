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

    toggleChannels() {

        const channelsUl = document.getElementById("channels-ul");

        if (channelsUl.style.display === "none") {
            channelsUl.style.display = "block";
        } else {
            channelsUl.style.display = "none";
        }

        const caret = document.getElementById("channels-caret");

        caret.classList.toggle("caret-toggled");
    };

    toggleDms() {

        const dmsUl = document.getElementById("dms-ul");

        if (dmsUl.style.display === "none") {
            dmsUl.style.display = "block";
        } else {
            dmsUl.style.display = "none";
        }

        const caret = document.getElementById("dms-caret");

        caret.classList.toggle("caret-toggled");
    };

    render(){


        this.channelsArray = Object.values(this.props.channels);

        return(
            
            <div className='channels-wrapper'>

                <div className="workspace-box">

                    <p>Your Workspace&nbsp;&nbsp;<i className="fas fa-chevron-down"></i></p>
                    
                    <div className="user-name"><i className="fas fa-circle"/>&nbsp;{this.props.currentUser.email}</div>

                </div>

                <div className='channels-toogle'>

                    <div className="channels-header">

                    <i id='channels-caret' className="fas fa-caret-down"></i>
                    
                    <button className='channels-toggle-button'
                    onClick={this.toggleChannels}>Channels</button>

                    <a onClick={() => this.props.openModal("addChannel")}><i className="fas fa-plus channel-fa-plus"></i></a>

                    </div>

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

                    <div className="channels-header">

                        <i id='dms-caret' className="fas fa-caret-down"></i>

                        <button className='dms-toggle-button' onClick={this.toggleDms}>Direct messages</button>

                        <a onClick={() => this.props.openModal("addChannel")}><i className="fas fa-plus dm-fa-plus"></i></a>
                    
                    </div>


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
            
            </div>

    )
    }
}

export default ChannelSidebar;