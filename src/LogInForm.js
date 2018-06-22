import React, {Component} from "react";

export default class LogInForm extends Component {
  render() {
    return (
      <form className="logIn" onSubmit={this.props.logIn.bind(this)}>
        <div className="row">
          <label>
            用户名:
            <p
              className="UserDialog-prompt"
              onClick={this.props.changeToSignUp.bind(this)}
            >
              没有账号？
            </p>
            <input
              type="text"
              value={this.props.formData.username}
              onChange={this.props.changeFormData.bind(this, "username")}
            />
          </label>
        </div>
        <div className="row">
          <label>
            密码:
            <p
              className="UserDialog-prompt"
              onClick={this.props.showForgetPassword.bind(this)}
            >
              忘记密码了？
            </p>
            <input
              type="password"
              value={this.props.formData.password}
              onChange={this.props.changeFormData.bind(this, "password")}
            />
          </label>
        </div>
        <div className="row actions">
          <button type="submit">提交</button>
        </div>
      </form>
    );
  }
}
