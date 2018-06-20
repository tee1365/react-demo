import React, {Component} from "react";
import ToDoBox from "./ToDoBox.js";
import ToDoItem from "./ToDoItem.js";
import UserDialog from "./UserDialog.js";
import "./App.css";
import "normalize.css";
import "./reset.css";
import "./UserDialog.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        <h1>a to-do list</h1>
        <div className="inputBox">
          <ToDoBox
            content={this.state.newTodo}
            submitBox={this.addToDo.bind(this)} // 子组件onKeyPress时调用
            changeBox={this.changeContent.bind(this)} // 子组件onChange时调用
          />
        </div>
        {todos}
        <UserDialog />
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

  componentDidUpdate(todo) {}
}

export default App;

let id = 0;

function idMaker() {
  id++;
  return id;
}
