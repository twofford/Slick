import React from 'react';

import ChannelSidebarContainer from './channel_sidebar_container';
import ChannelContainer from './channel_container';

class ChannelViewport extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        // debugger
        return(
            <div className='channel-viewport'>
                <ChannelSidebarContainer/>
                <ChannelContainer/>
            </div>
        )
    }
}

export default ChannelViewport;