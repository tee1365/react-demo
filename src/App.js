import React, {Component} from "react";
import ToDoBox from "./ToDoBox.js";
import ToDoItem from "./ToDoItem.js";
import "./App.css";
import "normalize.css";
import "./reset.css";

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
          <li key={index}>
            <ToDoItem
              todo={item}
              onToggle={this.toggle.bind(this)}
              onDelete={this.delete.bind(this)}
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
            onSubmit={this.addToDo.bind(this)}
            onChange={this.changeContent.bind(this)}
          />
        </div>
        {todos}
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
    console.log(e.target);
  }

  toggle(e, todo) {
    todo.status = todo.status === "completed" ? "" : "completed";
    this.setState(this.state);
  }

  delete(e, todo) {
    todo.deleted = true;
    this.setState(this.state);
  }
}

export default App;

let id = 0;

function idMaker() {
  id++;
  return id;
}
