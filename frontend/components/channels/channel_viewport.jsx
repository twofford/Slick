import React from 'react';

import ChannelSidebarContainer from './channel_sidebar_container';
import ChannelContainer from './channel_container';
import SearchbarContainer from '../searchbar/searchbar_container';

class ChannelViewport extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <>
            <div id='logged-in-container'>
            {/* <div className='search-bar'>

                    <div onClick={() => this.props.openModal("search")}className='search-inner-div'>
                    <i className="fas fa-search"></i>
                    &nbsp;&nbsp;
                    <p>Search Your Workspace</p>
                </div>
                    <p className="logout" onClick={this.props.logout}>
                        <i className="fas fa-sign-out-alt"></i>
                        &nbsp;Sign Out
                    </p>
            </div> */}
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