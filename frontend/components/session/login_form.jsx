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
        debugger
        event.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.login(user);
        debugger
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


        return (
            <div>

                <h1>Sign in to Slick</h1>

                <form>

                    <label>Email:
                    <input
                        type="text"
                        onChange={this.handleInput('email')}
                    />
                    </label>

                    <label>Password:
                    <input
                        type="password"
                        onChange={this.handleInput('password')}
                    />
                    </label>

                    <input
                    type="submit"
                    />

                </form>

            </div>
        );
    };
};

export default LoginForm;