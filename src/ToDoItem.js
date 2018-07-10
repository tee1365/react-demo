import React from "react";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {withStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";

const styles = {
  item: {
    justifyContent: "space-between"
  }
};

function ToDoItem(props) {
  return (
    <ListItem key={props.key} className={props.classes.item}>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.todo.status === "completed"}
            onChange={e => {
              props.toggle(e, props.todo);
            }}
            color="primary"
          />
        }
        label={props.todo.title}
      />
      <Button
        onClick={e => {
          props.delete(e, props.todo);
        }}
      >
        删除
      </Button>
    </ListItem>
  );
}

export default withStyles(styles)(ToDoItem);
