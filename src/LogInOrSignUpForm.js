import React, {Component} from "react";
import SignUpForm from "./SignUpForm.js";
import LogInForm from "./LogInForm.js";

export default class LogInOrSignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {selected: "logIn"};
  }

  switch(e) {
    this.setState({
      selected: e.target.value
    });
  }

  changeToSignUp(e) {
    let stateCopy = copyState(this.state);
    stateCopy.selected = "signUp";
    this.setState(stateCopy);
  }

  changeToLogIn(e) {
    let stateCopy = copyState(this.state);
    stateCopy.selected = "logIn";
    this.setState(stateCopy);
  }

  render() {
    return (
      <div className="logInOrSignUp">
        <nav onChange={this.switch.bind(this)}>
          <label className="radio">
            <input
              type="radio"
              value="logIn"
              checked={this.state.selected === "logIn"}
              onChange={this.switch.bind(this)}
            />
            登录
          </label>
          <label className="radio">
            <input
              type="radio"
              value="signUp"
              checked={this.state.selected === "signUp"}
              onChange={this.switch.bind(this)}
            />
            注册
          </label>
        </nav>
        <h2 className="dialog-header">
          {this.state.selected === "logIn" ? "登录" : "注册"}
        </h2>
        <div className="panes">
          {this.state.selected === "logIn" ? (
            <LogInForm
              formData={this.props.formData}
              changeToSignUp={this.changeToSignUp.bind(this)}
              changeFormData={this.props.changeFormData.bind(this)}
              logIn={this.props.logIn.bind(this)}
              showForgetPassword={this.props.showForgetPassword.bind(this)}
            />
          ) : (
            <SignUpForm
              formData={this.props.formData}
              signUp={this.props.signUp.bind(this)}
              changeFormData={this.props.changeFormData.bind(this)}
              changeToLogIn={this.changeToLogIn.bind(this)}
            />
          )}
        </div>
      </div>
    );
  }
}

function copyState(state) {
  return JSON.parse(JSON.stringify(state));
}
