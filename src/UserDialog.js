import React, {Component} from "react";
import {signUp, signIn} from "./leanCloud.js";
export default class UserDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "signIn",
      formData: {
        username: "",
        password: ""
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
    let {username, password} = this.state.formData;
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
    signUp(username, password, success, error);
  }

  signIn(e) {
    e.preventDefault();
    let {username, password} = this.state.formData;
    let success = user => {
      this.props.onSignIn.call(null, user);
      this.props.onLoadData.call(null);
    };
    let error = error => {
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
    signIn(username, password, success, error);
  }

  changeFormData(key, e) {
    let stateCopy = copyState(this.state);
    stateCopy.formData[key] = e.target.value;
    this.setState(stateCopy);
  }

  render() {
    let signInForm = (
      <form className="signIn" onSubmit={this.signIn.bind(this)}>
        <div className="row">
          <label>
            用户名:
            <input
              type="text"
              value={this.state.formData.username}
              onChange={this.changeFormData.bind(this, "username")}
            />
          </label>
        </div>
        <div className="row">
          <label>
            密码:
            <input
              type="password"
              value={this.state.formData.password}
              onChange={this.changeFormData.bind(this, "password")}
            />
          </label>
        </div>
        <div className="row actions">
          <button type="submit">提交</button>
        </div>
      </form>
    );

    let signUpForm = (
      <form className="signUp" onSubmit={this.signUp.bind(this)}>
        <div className="row">
          <label>
            用户名:
            <input
              type="text"
              value={this.state.formData.username}
              onChange={this.changeFormData.bind(this, "username")}
            />
          </label>
        </div>
        <div className="row">
          <label>
            密码:
            <input
              type="password"
              value={this.state.formData.password}
              onChange={this.changeFormData.bind(this, "password")}
            />
          </label>
        </div>
        <div className="row actions">
          <button type="submit">提交</button>
        </div>
      </form>
    );

    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          <nav onChange={this.switch.bind(this)}>
            <label>
              <input
                type="radio"
                value="signIn"
                checked={this.state.selected === "signIn"}
                onChange={this.switch.bind(this)}
              />
              登录
            </label>
            <label>
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
            {this.state.selected === "signIn" ? "登录" : "注册"}
          </h2>
          <div className="panes">
            {this.state.selected === "signIn" ? signInForm : signUpForm}
          </div>
        </div>
      </div>
    );
  }
}

function copyState(state) {
  return JSON.parse(JSON.stringify(state));
}
