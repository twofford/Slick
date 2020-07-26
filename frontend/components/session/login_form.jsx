import React from "react";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      online_status: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
  }

  handleInput(type) {
    return (event) => {
      this.setState({ [type]: event.target.value });
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.login(
      user).then(
      res => {
        this.props.updateUser({email: res.user.email, id:res.user.id, online_status: true})
      }
      )
      .then(
        this.props.fetchUsers()
      );
  }

  handleDemoLogin(event) {
    event.preventDefault();
    const user = Object.assign({}, { email: "DemoDude", password: "starwars", online_status: true });
    this.props
      .login(user)
      .then((res) => {
        this.props.updateUser({
          email: res.user.email,
          id: res.user.id,
          online_status: true,
        });
      })
      .then(this.props.fetchUsers());
  }

  renderErrors() {
    return (
      <>
        <ul className="errors-ul">
          {this.props.errors.map((error, i) => (
            <li className="error" key={`error-${i}`}>
              {error}
            </li>
          ))}
        </ul>
      </>
    );
  }

  render() {
    return (
      <>
        <div className="navbar-div">
          <ul className="navbar-ul">
            <li>
              <img className="navbar-logo" src={slackLogo}></img>
            </li>
          </ul>
        </div>

        <div className="form-div">
          <h1 className="login-form-h1">Sign in to Slick</h1>

          <p className="login-form-description">
            Enter your email and password.
          </p>

          <form>
            <input
              className="form-input"
              type="text"
              onChange={this.handleInput("email")}
              placeholder="name@example.com"
            />

            <br></br>

            <input
              className="form-input"
              type="password"
              onChange={this.handleInput("password")}
              placeholder="password"
            />

            {this.renderErrors()}

            <button className="form-button" onClick={this.handleSubmit}>
              Continue →
            </button>
          </form>
          
          <br/>

          <div id="demo-login-div">
            Don't have an account?{" "}
            <a id="demo-login-button" onClick={this.handleDemoLogin}>
              Login as a demo user.
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default LoginForm;
