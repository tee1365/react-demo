import React, {Component} from "react";
import {signUp, logIn, resetPassword} from "./leanCloud.js";
import ResetPasswordForm from "./ResetPasswordForm.js";
import LogInOrSignUpForm from "./LogInOrSignUpForm.js";

export default class UserDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forgotten: false,
      formData: {
        username: "",
        password: "",
        email: ""
      }
    };
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
    let fail = error => {
      console.log(error.code);
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
    logIn(username, password, success, fail);
  }

  changeFormData(key, e) {
    let stateCopy = copyState(this.state);
    stateCopy.formData[key] = e.target.value;
    this.setState(stateCopy);
  }

  resetPassword(e) {
    e.preventDefault();
    let email = this.state.formData.email;
    let successfn = () => {
      console.log("发送成功，请注意查看邮箱");
    };
    let failfn = () => {
      console.log("发送失败，请重试");
    };
    resetPassword(email, successfn, failfn);
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

  render() {
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          {this.state.forgotten === false ? (
            <LogInOrSignUpForm
              formData={this.state.formData}
              changeFormData={this.changeFormData.bind(this)}
              logIn={this.logIn.bind(this)}
              showForgetPassword={this.showForgetPassword.bind(this)}
              signUp={this.signUp.bind(this)}
            />
          ) : (
            <ResetPasswordForm
              formData={this.state.formData}
              returnToLogIn={this.returnToLogIn.bind(this)}
              resetPassword={this.resetPassword.bind(this)}
              changeFormData={this.changeFormData.bind(this)}
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
