import React, {Component} from "react";
import {signUp, logIn, resetPassword} from "./leanCloud.js";
import ResetPasswordForm from "./ResetPasswordForm.js";
import LogInOrSignUpForm from "./LogInOrSignUpForm.js";
import Modal from "@material-ui/core/Modal";
import {withStyles} from "@material-ui/core/styles";

const styles = {
  form: {
    width: "24em",
    position: "absulute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)"
  }
};
class UserDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "logIn",
      forgotten: false,
      formData: {
        username: "",
        password: "",
        email: ""
      },
      open: true
    };
  }

  signUp(e) {
    e.preventDefault();
    let {username, password, email} = this.state.formData;
    if (password.includes(" ") || username.includes(" ")) {
      alert("请不要在用户名或密码中使用空格");
      return;
    }
    if (password.length === 0 || username.length === 0 || email.length === 0) {
      alert("请先填写所有项目");
      return;
    }
    if (username.length < 3 || username.length > 12) {
      alert("用户名长度需要大于3位小于12位");
      return;
    }
    if (password.length < 6 || password.length > 12) {
      alert("密码长度需大于6位小于12位");
      return;
    }
    let success = user => {
      this.props.onSignUp.call(null, user);
    };
    let fail = error => {
      switch (error.code) {
        case 200:
          alert("没有提供用户名，或者用户名为空。");
          break;
        case 201:
          alert("没有提供密码，或者密码为空。");
          break;
        case 202:
          alert("用户名已经被占用。");
          break;
        case 125:
          alert("邮箱地址无效");
          break;
        case 203:
          alert("电子邮箱地址已经被占用。");
          break;
        case 204:
          alert("没有提供电子邮箱地址。");
          break;
        case 217:
          alert("无效的用户名，不允许空白用户名。");
          break;
        case 218:
          alert("无效的密码，不允许空白密码。");
          break;
        default:
          alert(error);
          break;
      }
    };
    signUp(username, password, email, success, fail);
  }

  logIn(e) {
    e.preventDefault();
    let {username, password} = this.state.formData;
    let success = user => {
      this.props.onlogIn.call(null, user);
      this.props.initUserData.call(null);
    };
    let fail = error => {
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
        case 219:
          alert("登录失败次数超过限制，请稍候再试，或者通过忘记密码重设密码。");
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

  switch(e) {
    this.setState({
      selected: this.state.selected === "logIn" ? "signUp" : "logIn"
    });
  }

  resetPassword(e) {
    e.preventDefault();
    let email = this.state.formData.email;
    let success = () => {
      console.log("发送成功，请注意查看邮箱");
    };
    let fail = () => {
      console.log("发送失败，请重试");
    };
    resetPassword(email, success, fail);
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
      <Modal open={this.state.open}>
        {this.state.forgotten === false ? (
          <LogInOrSignUpForm
            selected={this.state.selected}
            formData={this.state.formData}
            changeFormData={this.changeFormData.bind(this)}
            logIn={this.logIn.bind(this)}
            showForgetPassword={this.showForgetPassword.bind(this)}
            signUp={this.signUp.bind(this)}
            switch={this.switch.bind(this)}
          />
        ) : (
          <ResetPasswordForm
            formData={this.state.formData}
            returnToLogIn={this.returnToLogIn.bind(this)}
            resetPassword={this.resetPassword.bind(this)}
            changeFormData={this.changeFormData.bind(this)}
          />
        )}
      </Modal>
    );
  }
}

function copyState(state) {
  return JSON.parse(JSON.stringify(state));
}

export default withStyles(styles)(UserDialog);
