import React, {Component} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = {
  wrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  header: {
    margin: "20px",
    marginLeft: "0"
  },
  search: {
    marginBottom: "10px"
  },
  card: {
    width: "22em",
    zIndex: "1600"
  },
  listBox: {
    overflowX: "hidden",
    overflowY: "auto",
    height: "20em"
  }
};

class DeletedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletedList: this.props.todoList.filter(function(list) {
        return list.deleted;
      })
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    let query = e.target.value;
    let stateCopy = copyState(this.state);
    stateCopy.deletedList = this.props.todoList.filter(list => {
      return list.title.includes(query) && list.deleted;
    });
    this.setState(stateCopy);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      deletedList: this.props.todoList.filter(function(list) {
        return list.deleted;
      })
    });
  }

  render() {
    let deletedListElement = this.state.deletedList.map((item, index) => {
      return (
        <ListItem key={index}>
          <ListItemText variant="Headline" className={this.props.classes.title}>
            {item.title}
          </ListItemText>
          <Button
            onClick={e => {
              this.props.undoDelete(e, item);
            }}
          >
            恢复
          </Button>
        </ListItem>
      );
    });

    return (
      <div className={this.props.classes.wrapper}>
        <Card className={this.props.classes.card}>
          <CardContent>
            <Typography variant="title" className={this.props.classes.header}>
              被删除项列表
            </Typography>
            <TextField
              label="Search"
              type="search"
              fullWidth
              className={this.props.classes.search}
              onChange={this.handleInput}
            />
            <List className={this.props.classes.listBox}>
              {deletedListElement}
            </List>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              color="primary"
              onClick={this.props.toggleDeletedList.bind(this)}
            >
              返回
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(DeletedList);

function copyState(state) {
  return JSON.parse(JSON.stringify(state));
}
