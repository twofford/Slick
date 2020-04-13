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

    handleSubmit(event){
        
        event.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.createNewUser(user);
        
    }

    renderErrors() {
        return (
            <ul>
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render(){

        return(

            
            <div className='form-div'>
                <h1 className='signup-form-h1'>First, enter your email and choose a password</h1>
                <p className='signup-form-description'>No need to check your email &mdash; we'll log you right in.</p>

                <form>

                <input
                    className='form-input'
                    type="text"
                    onChange={this.handleInput('email')}
                    placeholder='name@example.com'
                />

                <br></br>
                
                <input
                    className='form-input'
                    type="password"
                    onChange={this.handleInput('password')}
                    placeholder='password'
                />

                {this.renderErrors()}

                <button
                    className='form-button'          onClick={this.handleSubmit}>
                    Confirm
                </button>

                </form>

                <div>
                    <img
                    className='form-image'
                    src={createTeam}></img>
                </div>

            </div>
        );
    };
};

export default SignupForm;