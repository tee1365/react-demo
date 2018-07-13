import React from "react";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {withStyles} from "@material-ui/core/styles";

const styles = {
  details: {
    width: "28em",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)"
  },
  p: {
    marginBottom: "30px"
  }
};

function ItemDetails(props) {
  return (
    <Modal open={props.details} onClose={props.handleClose.bind(this)}>
      <Card className={props.classes.details}>
        <CardContent>
          <Typography variant="display1" className={props.classes.p}>
            {props.todo.title}
          </Typography>
          <Typography variant="title" className={props.classes.p}>
            {props.todo.status === "" ? "未完成" : "已完成"}
          </Typography>
          <Typography variant="title" className={props.classes.p}>
            {"创建于" + props.todo.date}
          </Typography>
        </CardContent>
      </Card>
    </Modal>
  );
}

export default withStyles(styles)(ItemDetails);
