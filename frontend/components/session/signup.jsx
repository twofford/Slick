import React from 'react';

class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleInput(type){
        return () => {
            this.setState({[type]: e.target.value});
        };
    };

    // FIX - ROUTE
    handleSubmit(event){
        event.preventDefault();
        this.props.createNewUser(this.state).then(() => this.props.history.push('/'));
    };

    render(){

        let formMessage;
        let formType;

        if (this.props.formType === 'email') {
            formMessage = 'First, enter your email';
            formType = 'text';
        } else {
            formMessage = 'Next, choose a password';
            formType = 'password';
        }


        return(
            <div>

                <h1>{formMessage}</h1>

                <form>

                <input
                    type={formType}
                    value={this.props.formType}
                    onChange={this.handleInput(this.props.formType)}/>

                <button onClick={this.handleSubmit}>Confirm</button>

                </form>

            </div>
        );
    };
};

export default Signup;