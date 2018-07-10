import React from "react";
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";

const styles = {
  search: {
    width: "80%",
    marginBottom: "20px",
    marginLeft: "20px"
  }
};

const SearchBox = props => {
  return (
    <TextField
      label="你想做点什么:"
      value={props.newTodo}
      placeholder="按Enter完成输入"
      className={props.classes.search}
      onChange={e => {
        props.changeContent(e);
      }}
      onKeyPress={e => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
          props.addToDo(e);
        }
      }}
    />
  );
};

export default withStyles(styles)(SearchBox);
