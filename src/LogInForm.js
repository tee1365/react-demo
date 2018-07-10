import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";

const styles = {
  form: {
    width: "16em"
  },
  username: {
    marginBottom: "10px"
  },
  password: {
    marginBottom: "30px"
  },
  button: {
    width: "50%"
  }
};

function LogInForm(props) {
  return (
    <form className={props.classes.form} onSubmit={props.logIn.bind(this)}>
      <TextField
        id="username"
        label="用户名"
        fullWidth
        className={props.classes.username}
        value={props.formData.username}
        onChange={props.changeFormData.bind(this, "username")}
      />
      <TextField
        id="password"
        label="密码"
        type="password"
        fullWidth
        className={props.classes.password}
        value={props.formData.password}
        onChange={props.changeFormData.bind(this, "password")}
      />
      <Button
        className={props.classes.button}
        onClick={props.showForgetPassword.bind(this)}
      >
        忘记密码了？
      </Button>
      <Button className={props.classes.button} type="submit">
        提交
      </Button>
    </form>
  );
}

export default withStyles(styles)(LogInForm);
