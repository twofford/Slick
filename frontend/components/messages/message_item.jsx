import React from 'react';

export default class MessageItem extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <li>{this.props.message.body}</li>
            </div>
        )
    }
}