import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";

const styles = {
  form: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)"
  },
  return: {
    float: "right"
  },
  title: {
    marginTop: "20px",
    marginBottom: "20px"
  },
  email: {
    marginBottom: "20px"
  }
};

function ResetPasswordForm(props) {
  return (
    <Card className={props.classes.form}>
      <CardContent>
        <Typography variant="title" className={props.classes.title}>
          重置密码
          <Button
            size="small"
            onClick={props.returnToLogIn.bind(this)}
            className={props.classes.return}
          >
            返回
          </Button>
        </Typography>
        <form onSubmit={props.resetPassword.bind(this)}>
          <TextField
            label="请输入邮箱"
            fullWidth
            className={props.classes.email}
            value={props.formData.email}
            onChange={props.changeFormData.bind(this, "email")}
          />
          <Button type="submit" fullWidth>
            发送邮件
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(ResetPasswordForm);
