import React, {Component} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import green from "@material-ui/core/colors/green";

const styles = theme => ({
  header: {
    margin: "20px",
    marginLeft: "0"
  },
  search: {
    marginBottom: "10px"
  },
  card: {
    width: "22em",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)"
  },
  listBox: {
    overflowX: "hidden",
    overflowY: "auto",
    height: "20em"
  },
  button: {
    color: theme.palette.getContrastText(green[700]),
    backgroundColor: green[700],
    "&:hover": {
      backgroundColor: green[900]
    }
  },
  title: {
    width: "12em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  item: {
    padding: "12px 0",
    justifyContent: "space-between"
  }
});

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
        <ListItem key={index} className={this.props.classes.item}>
          <Typography variant="title" className={this.props.classes.title}>
            {item.title}
          </Typography>
          <Button
            className={this.props.classes.button}
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
      <Modal
        open={this.props.deletedListOpen}
        onClose={this.props.toggleDeletedList.bind(this)}
      >
        <Card className={this.props.classes.card}>
          <CardContent>
            <Typography
              variant="display2"
              className={this.props.classes.header}
            >
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
      </Modal>
    );
  }
}

export default withStyles(styles)(DeletedList);

function copyState(state) {
  return JSON.parse(JSON.stringify(state));
}
