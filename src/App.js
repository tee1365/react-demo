import React, {Component} from "react";
import ToDoBox from "./ToDoBox.js";
import ToDoItem from "./ToDoItem.js";
import UserDialog from "./UserDialog.js";
import {getCurrentUser, logOut, TodoModel} from "./leanCloud.js";
import TodoConfig from "./TodoConfig.js";
import "./App.css";
import "normalize.css";
import "./reset.css";
import "./UserDialog.css";

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
      deleted: false
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
    TodoModel.destroy(todo.id, () => {
      todo.deleted = true;
      this.setState(this.state);
    });
  }

  clearList() {
    let stateCopy = copyState(this.state);
    for (let i = 0; i < stateCopy.todoList.length; i++) {
      TodoModel.destroy(stateCopy.todoList[i].id, () => {
        stateCopy.todoList[i].deleted = true;
        this.setState(stateCopy);
      });
    }
  }

  showDeletedList() {}

  render() {
    let todos = this.state.todoList
      .filter(function(list) {
        return !list.deleted;
      })
      .map((item, index) => {
        return (
          <li key={index} className="ToDoLi">
            <ToDoItem
              todo={item}
              toggle={this.toggle.bind(this)} // 子组件onChange时调用
              delete={this.delete.bind(this)} // 子组件onClick时调用
            />
          </li>
        );
      });

    return (
      <div className="App">
        <h1>
          {this.state.user.username || "我"}的待办列表
          {this.state.user.id ? (
            <TodoConfig
              showDeletedList={this.showDeletedList.bind(this)}
              clearList={this.clearList.bind(this)}
              logOut={this.logOut.bind(this)}
            />
          ) : null}
        </h1>
        <div className="inputBox">
          <ToDoBox
            newTodo={this.state.newTodo}
            addToDo={this.addToDo.bind(this)} // 子组件onKeyPress时调用
            changeContent={this.changeContent.bind(this)} // 子组件onChange时调用
          />
        </div>
        {todos}
        {this.state.user.id ? null : (
          <UserDialog
            onSignUp={this.onSignUporlogIn.bind(this)}
            onlogIn={this.onSignUporlogIn.bind(this)}
            initUserData={this.initUserData.bind(this)}
          />
        )}
      </div>
    );
  }
}

function copyState(state) {
  return JSON.parse(JSON.stringify(state));
}

export default App;
