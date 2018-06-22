import React, {Component} from "react";

export default class SignUpForm extends Component {
  render() {
    return (
      <form className="signUp" onSubmit={this.props.signUp.bind(this)}>
        <div className="row">
          <label>
            用户名:
            <p
              className="UserDialog-prompt"
              onClick={this.props.changeToLogIn.bind(this)}
            >
              已经有账号了？
            </p>
            <input
              type="text"
              value={this.props.formData.username}
              onChange={this.props.changeFormData.bind(null, "username")}
            />
          </label>
        </div>
        <div className="row">
          <label>
            邮箱:
            <input
              type="text"
              value={this.props.formData.email}
              onChange={this.props.changeFormData.bind(null, "email")}
            />
          </label>
        </div>
        <div className="row">
          <label>
            密码:
            <input
              type="password"
              value={this.props.formData.password}
              onChange={this.props.changeFormData.bind(null, "password")}
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
