import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {withStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import red from "@material-ui/core/colors/red";
import Typography from "@material-ui/core/Typography";
import ItemDetails from "./ItemDetails.js";

const styles = theme => ({
  item: {
    justifyContent: "space-between"
  },
  button: {
    color: theme.palette.getContrastText(red[700]),
    backgroundColor: red[700],
    "&:hover": {
      backgroundColor: red[900]
    }
  },
  title: {
    width: "16em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    cursor: "pointer"
  },
  details: {
    width: "32em",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)"
  }
});

class ToDoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: false
    };
  }

  handleClick = e => {
    e.stopPropagation();
    this.setState({details: true});
  };

  handleClose = e => {
    this.setState({details: false});
  };

  render() {
    return (
      <ListItem key={this.props.key} className={this.props.classes.item}>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.props.todo.status === "completed"}
              onChange={e => {
                this.props.toggle(e, this.props.todo);
              }}
              color="primary"
            />
          }
        />
        <Typography
          variant="title"
          className={this.props.classes.title}
          onClick={this.handleClick.bind(this)}
        >
          {this.props.todo.title}
        </Typography>
        <Button
          className={this.props.classes.button}
          onClick={e => {
            this.props.delete(e, this.props.todo);
          }}
        >
          删除
        </Button>
        <ItemDetails
          details={this.state.details}
          handleClose={this.handleClose.bind(this)}
          todo={this.props.todo}
        />
      </ListItem>
    );
  }
}

export default withStyles(styles)(ToDoItem);
