import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleInput(type) {
        return (event) => {
            this.setState({ [type]: event.target.value });
        };
    };

    // FIX - ROUTE
    handleSubmit(event) {
        event.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.login(user);
        
    };

    render() {

        // let formMessage;
        // let formType;

        // if (this.props.formType === 'email') {
        //     formMessage = 'First, enter your email';
        //     formType = 'text';
        // } else {
        //     formMessage = 'Next, choose a password';
        //     formType = 'password';
        // }

        // if (currentUser) {
        //     return (
        //         <div>
        //             <p>A user is logged in</p>
        //             <button onClick={this.props.logout}>Logout</button>
        //         </div>
        //     )
        // } else {

        return (
            <div className='login-form-container-wrapper'>
            <div className='login-form-div'>

                <h1 className='login-form-h1'>Sign in to Slick</h1>

                <p className='description'>Enter your email and password.</p>

                <form>

                   
                    <input
                    className='login-form-input'
                        type="text"
                        onChange={this.handleInput('email')}
                        placeholder='name@example.com'
                    />
                    
                    <br></br>

                    
                    <input
                    className='login-form-input'
                        type="password"
                        onChange={this.handleInput('password')}
                        placeholder='password'
                    />
                    

                    <button
                    className='login-form-button'
                        onClick={this.handleSubmit}>Continue →</button>

                </form>

            </div>
            </div>
        );
    };
};

export default LoginForm;