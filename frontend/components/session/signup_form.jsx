import React from 'react';

class SignupForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleInput(type){
        return (event) => {
            this.setState({[type]: event.target.value});
        };
    };

    // FIX - ROUTE
    handleSubmit(event){
        
        event.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.createNewUser(user);
        
    }

    render(){

        // let formMessage;
        // let formType;

        // if (this.props.formType === 'email') {
        //     formMessage = 'First, enter your email';
        //     formType = 'text';
        // } else {
        //     formMessage = 'Next, choose a password';
        //     formType = 'password';
        // }


        return(
            <div className='signup-form-div'>

                <h1>First, enter your email and choose a username and password</h1>

                <form>

                <input
                    className="signup-form-input"
                    type="text"
                    onChange={this.handleInput('email')}
                />

                <input
                    className="signup-form-input"
                    type="text"
                    onChange={this.handleInput('username')}
                />
                
                <input
                    className="signup-form-input"
                    type="password"
                    onChange={this.handleInput('password')}
                />

                <button 
                    onClick={this.handleSubmit}>
                    Confirm
                </button>

                </form>

            </div>
        );
    };
};

export default SignupForm;