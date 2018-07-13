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
  email: {
    marginBottom: "10px"
  },
  password: {
    marginBottom: "30px"
  }
};

function SignUpForm(props) {
  return (
    <form className={props.classes.form} onSubmit={props.signUp.bind(this)}>
      <TextField
        id="username"
        label="用户名"
        fullWidth
        placeholder="不少于6位"
        className={props.classes.username}
        value={props.formData.username}
        onChange={props.changeFormData.bind(this, "username")}
      />
      <TextField
        id="email"
        label="邮箱"
        fullWidth
        className={props.classes.email}
        value={props.formData.email}
        onChange={props.changeFormData.bind(this, "email")}
      />
      <TextField
        id="password"
        label="密码"
        type="password"
        placeholder="不少于8位"
        fullWidth
        className={props.classes.password}
        value={props.formData.password}
        onChange={props.changeFormData.bind(this, "password")}
      />
      <Button type="submit" fullWidth color="primary">
        提交
      </Button>
    </form>
  );
}

export default withStyles(styles)(SignUpForm);
