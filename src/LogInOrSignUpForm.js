import React from "react";
import SignUpForm from "./SignUpForm.js";
import LogInForm from "./LogInForm.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {withStyles} from "@material-ui/core/styles";

const styles = {
  form: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)"
  },
  title: {
    marginBottom: "20px",
    marginTop: "10px"
  }
};

function LogInOrSignUpForm(props) {
  return (
    <Card className={props.classes.form}>
      <Tabs value={props.selected} onChange={props.switch.bind(this)}>
        <Tab label="注册" value="signUp" />
        <Tab label="登录" value="logIn" />
      </Tabs>
      <CardContent>
        <Typography variant="title" className={props.classes.title}>
          {props.selected === "logIn" ? "登录" : "注册"}
        </Typography>
        {props.selected === "logIn" ? (
          <LogInForm
            formData={props.formData}
            changeFormData={props.changeFormData.bind(this)}
            logIn={props.logIn.bind(this)}
            showForgetPassword={props.showForgetPassword.bind(this)}
          />
        ) : (
          <SignUpForm
            formData={props.formData}
            signUp={props.signUp.bind(this)}
            changeFormData={props.changeFormData.bind(this)}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(LogInOrSignUpForm);
