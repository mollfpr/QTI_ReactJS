import React, { Component } from "react";

import "../static/css/login.css";

class Login extends Component {
  emailRef = React.createRef();
  passwordRef = React.createRef();

  doLogin = event => {
    event.preventDefault();

    let form = new FormData();
    form.append("email", this.emailRef.current.value);
    form.append("password", this.passwordRef.current.value);

    fetch(`http://localhost:8000/api/login`, {
      method: "POST",
      body: form
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem("token", json.success.token);
        this.props.history.push("/");
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <div id="LoginForm">
        <div className="container">
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                <h2>Admin Login</h2>
                <p>Please enter your email and password</p>
              </div>
              <form id="Login" onSubmit={this.doLogin}>
                <div className="form-group">
                  <input
                    ref={this.emailRef}
                    type="email"
                    className="form-control"
                    id="inputEmail"
                    placeholder="Email Address"
                  />
                </div>
                <div className="form-group">
                  <input
                    ref={this.passwordRef}
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Password"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
              <p className="botto-text"> Designed by Sunil Rajput</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
