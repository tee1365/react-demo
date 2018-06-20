import React, {Component} from "react";
import ToDoBox from "./ToDoBox.js";
import ToDoItem from "./ToDoItem.js";
import UserDialog from "./UserDialog.js";
import {getCurrentUser, signOut} from "./leanCloud.js";
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
  }

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
              toggleItem={this.toggle.bind(this)} // 子组件onChange时调用
              deleteItem={this.delete.bind(this)} // 子组件onClick时调用
            />
          </li>
        );
      });

    return (
      <div className="App">
        <h1>
          {this.state.user.username || "我"}的待办
          {this.state.user.id ? (
            <button className="sign-button" onClick={this.signOut.bind(this)}>
              登出
            </button>
          ) : null}
        </h1>
        <div className="inputBox">
          <ToDoBox
            content={this.state.newTodo}
            submitBox={this.addToDo.bind(this)} // 子组件onKeyPress时调用
            changeBox={this.changeContent.bind(this)} // 子组件onChange时调用
          />
        </div>
        {todos}
        {this.state.user.id ? null : (
          <UserDialog
            onSignUp={this.onSignUporSignIn.bind(this)}
            onSignIn={this.onSignUporSignIn.bind(this)}
          />
        )}
      </div>
    );
  }

  addToDo(e) {
    this.state.todoList.push({
      id: idMaker(),
      title: e.target.value,
      status: null,
      deleted: false
    });
    this.setState({newTodo: "", todoList: this.state.todoList});
  }

  changeContent(e) {
    this.setState({newTodo: e.target.value, todoList: this.state.todoList});
  }

  toggle(e, todo) {
    todo.status = todo.status === "completed" ? "" : "completed";
    this.setState(this.state);
  }

  delete(e, todo) {
    todo.deleted = true;
    this.setState(this.state);
  }

  onSignUporSignIn(user) {
    let stateCopy = copyState(this.state);
    stateCopy.user = user;
    this.setState(stateCopy);
  }

  signOut() {
    signOut();
    let stateCopy = copyState(this.state);
    stateCopy.user = {};
    this.setState(stateCopy);
  }
}

let id = 0;

function idMaker() {
  id++;
  return id;
}

function copyState(state) {
  return JSON.parse(JSON.stringify(state));
}

export default App;
