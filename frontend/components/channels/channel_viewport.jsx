import React from 'react';

import ChannelSidebarContainer from './channel_sidebar_container';
import ChannelContainer from './channel_container';
import SearchbarContainer from '../searchbar/searchbar_container';

class ChannelViewport extends React.Component{
    constructor(props){
        super(props)

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {//gotta make it broadcast
        event.preventDefault();
        this.props.updateUser({email: this.props.currentUser.email, id: this.props.currentUser.id, online_status: false})
        .then(res => {
            App.cable.subscriptions.subscriptions[1].speak({
                user: {
                id: res.user.id,
                email: res.user.email,
                online_status: false,
                }
            })
            return res;
        })
        .then(res => {
            this.props.logout(res);
        })
    }

    render(){
        return(
            <>
            <div id='logged-in-container'>
            <div className='search-bar'>

                    <div onClick={() => this.props.openModal("search")}className='search-inner-div'>
                    <i className="fas fa-search"></i>
                    &nbsp;&nbsp;
                    <p>Search Your Workspace</p>
                </div>
                    <p className="logout" onClick={this.handleLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                        &nbsp;Sign Out
                    </p>
            </div>
            <div className='channel-viewport'>
                <ChannelSidebarContainer/>
                <ChannelContainer/>
            </div>
            </div>
            </>
        )
    }
}

export default ChannelViewport;