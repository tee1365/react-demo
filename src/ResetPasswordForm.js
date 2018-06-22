import React, {Component} from "react";

export default class ResetPasswordForm extends Component {
  render() {
    return (
      <div className="resetPassword">
        <h2 className="dialog-header">重置密码</h2>
        <p
          className="UserDialog-return"
          onClick={this.props.returnToLogIn.bind(this)}
        >
          返回
        </p>
        <form className="panes" onSubmit={this.props.resetPassword.bind(this)}>
          <div className="row">
            <label>
              请输入邮箱
              <input
                type="text"
                value={this.props.formData.email}
                onChange={this.props.changeFormData.bind(this, "email")}
              />
            </label>
          </div>
          <div className="row actions">
            <button type="submit">发送邮件</button>
          </div>
        </form>
      </div>
    );
  }
}
