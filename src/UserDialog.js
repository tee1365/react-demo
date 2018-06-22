import React, {Component} from "react";
import {signUp, logIn, resetPassword} from "./leanCloud.js";
import SignUpForm from "./SignUpForm.js";
import LogInForm from "./LogInForm.js";
export default class UserDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "logIn",
      forgotten: false,
      formData: {
        username: "",
        password: "",
        email: ""
      }
    };
  }

  switch(e) {
    this.setState({
      selected: e.target.value
    });
  }

  signUp(e) {
    e.preventDefault();
    let {username, password, email} = this.state.formData;
    let success = user => {
      this.props.onSignUp.call(null, user);
    };
    let error = error => {
      switch (error.code) {
        case 202:
          alert("用户名已经被占用。");
          break;
        case 217:
          alert("无效的用户名，不允许空白用户名。");
          break;
        case 218:
          alert("无效的密码，不允许空白密码。");
          break;
        case 219:
          alert("登录失败次数超过限制，请稍候再试，或者通过忘记密码重设密码。");
          break;
        default:
          alert(error);
          break;
      }
    };
    signUp(username, password, email, success, error);
  }

  logIn(e) {
    e.preventDefault();
    let {username, password} = this.state.formData;
    let success = user => {
      this.props.onlogIn.call(null, user);
      this.props.onLoadData.call(null);
    };
    let error = error => {
      console.log("b");
      switch (error.code) {
        case 200:
          alert("没有提供用户名，或者用户名为空。");
          break;
        case 201:
          alert("没有提供密码，或者密码为空。");
          break;
        case 210:
          alert("用户名和密码不匹配。");
          break;
        case 211:
          alert("找不到用户。");
          break;
        default:
          alert(error);
          break;
      }
    };
    logIn(username, password, success, error);
  }

  changeFormData(key, e) {
    let stateCopy = copyState(this.state);
    stateCopy.formData[key] = e.target.value;
    this.setState(stateCopy);
  }

  resetPassword(e) {
    e.preventDefault();
    let email = this.state.formData.email;
    let success = () => {
      console.log("发送成功，请注意查看邮箱");
    };
    let error = () => {
      console.log("发送失败，请重试");
    };
    resetPassword(email, success, error);
  }

  showForgetPassword(e) {
    let stateCopy = copyState(this.state);
    stateCopy.forgotten = !stateCopy.forgotten ? true : false;
    this.setState(stateCopy);
  }

  returnToLogIn(e) {
    let stateCopy = copyState(this.state);
    stateCopy.forgotten = false;
    this.setState(stateCopy);
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
    let logInOrSignUpForm = (
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
              formData={this.state.formData}
              changeToSignUp={this.changeToSignUp.bind(this)}
              changeFormData={this.changeFormData.bind(this)}
              logIn={this.logIn.bind(this)}
              showForgetPassword={this.showForgetPassword.bind(this)}
            />
          ) : (
            <SignUpForm
              formData={this.state.formData}
              onSubmit={this.signUp.bind(this)}
              onChange={this.changeFormData.bind(this)}
              onClick={this.changeToLogIn.bind(this)}
            />
          )}
        </div>
      </div>
    );

    let forgottenForm = (
      <div className="resetPassword">
        <h2 className="dialog-header">重置密码</h2>
        <p
          className="UserDialog-return"
          onClick={this.returnToLogIn.bind(this)}
        >
          返回
        </p>
        <form className="panes" onSubmit={this.resetPassword.bind(this)}>
          <div className="row">
            <label>
              请输入邮箱
              <input
                type="text"
                value={this.state.formData.email}
                onChange={this.changeFormData.bind(this, "email")}
              />
            </label>
          </div>
          <div className="row actions">
            <button type="submit">发送邮件</button>
          </div>
        </form>
      </div>
    );

    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          {this.state.forgotten === false ? logInOrSignUpForm : forgottenForm}
        </div>
      </div>
    );
  }
}

function copyState(state) {
  return JSON.parse(JSON.stringify(state));
}
