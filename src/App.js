import React, {Component} from "react";
import SearchBox from "./SearchBox.js";
import ToDoItem from "./ToDoItem.js";
import UserDialog from "./UserDialog.js";
import {getCurrentUser, logOut, TodoModel} from "./leanCloud.js";
import TodoConfig from "./TodoConfig.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import "normalize.css";

const styles = {
  app: {
    width: "32em",
    height: "40em",
    position: "relative",
    marginTop: "2em",
    userSelect: "none"
  },
  header: {
    margin: "20px"
  },
  scroll: {
    overflowX: "hidden",
    overflowY: "auto",
    height: "28em"
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: getCurrentUser() || {},
      newTodo: "",
      todoList: []
    };
    this.initUserData();
  }

  addToDo(e) {
    let newTodo = {
      title: e.target.value,
      status: "",
      deleted: false,
      date: new Date().toLocaleString()
    };
    TodoModel.create(
      newTodo,
      id => {
        newTodo.id = id;
        this.state.todoList.push(newTodo);
        this.setState({
          newTodo: "",
          todoList: this.state.todoList
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  changeContent(e) {
    this.setState({newTodo: e.target.value, todoList: this.state.todoList});
  }

  toggle(e, todo) {
    let oldStatus = todo.status;
    todo.status = todo.status === "completed" ? "" : "completed";
    TodoModel.update(
      todo,
      () => {
        this.setState(this.state);
      },
      error => {
        todo.status = oldStatus;
        this.setState(this.state);
      }
    );
  }

  onSignUporlogIn(user) {
    let stateCopy = copyState(this.state);
    stateCopy.user = user;
    this.setState(stateCopy);
  }

  logOut() {
    logOut();
    let stateCopy = copyState(this.state);
    stateCopy.user = {};
    stateCopy.todoList = [];
    this.setState(stateCopy);
  }

  initUserData() {
    let user = getCurrentUser();
    if (user) {
      TodoModel.getByUser(user, todolist => {
        let stateCopy = copyState(this.state);
        stateCopy.todoList = todolist;
        this.setState(stateCopy);
      });
    }
  }

  delete(e, todo) {
    TodoModel.delete(todo.id, () => {
      todo.deleted = true;
      this.setState(this.state);
    });
  }

  undoDelete(e, todo) {
    TodoModel.undoDelete(todo.id, () => {
      todo.deleted = false;
      this.setState(this.state);
    });
  }

  clearList() {
    let stateCopy = copyState(this.state);
    for (let i = 0; i < stateCopy.todoList.length; i++) {
      TodoModel.delete(stateCopy.todoList[i].id, () => {
        stateCopy.todoList[i].deleted = true;
        this.setState(stateCopy);
      });
    }
  }

  render() {
    let todos = this.state.todoList
      .filter(function(list) {
        return !list.deleted;
      })
      .map((item, index) => {
        return (
          <ToDoItem
            key={index}
            todo={item}
            toggle={this.toggle.bind(this)} // 子组件onChange时调用
            delete={this.delete.bind(this)} // 子组件onClick时调用
          />
        );
      });

    return (
      <Card className={this.props.classes.app}>
        <CardContent>
          <Typography variant="display2" className={this.props.classes.header}>
            {this.state.user.username || "我"}的待办列表
            <TodoConfig
              user={this.state.user}
              todoList={this.state.todoList}
              clearList={this.clearList.bind(this)}
              logOut={this.logOut.bind(this)}
              undoDelete={this.undoDelete.bind(this)}
            />
          </Typography>
          <SearchBox
            className={this.props.classes.search}
            newTodo={this.state.newTodo}
            addToDo={this.addToDo.bind(this)}
            changeContent={this.changeContent.bind(this)}
          />
          <List className={this.props.classes.scroll}>{todos}</List>
          {this.state.user.id ? null : (
            <UserDialog
              onSignUp={this.onSignUporlogIn.bind(this)}
              onlogIn={this.onSignUporlogIn.bind(this)}
              initUserData={this.initUserData.bind(this)}
            />
          )}
        </CardContent>
      </Card>
    );
  }
}

function copyState(state) {
  return JSON.parse(JSON.stringify(state));
}

export default withStyles(styles)(App);
