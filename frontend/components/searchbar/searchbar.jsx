import React from 'react';

export default class Searchbar extends React.Component {
    constructor(props){
        super(props)

        this.state = { searchValue: '' }

        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(type) {
        return (event) => {
            this.setState({
                [type]: event.target.value,
            });
        };
    };

    render(){
        return(
            <div>
                <form>
                    <input type='text' onChange={this.handleInput('searchValue')}></input>
                </form>
            </div>
        )
    }

}