import React, {Component} from 'react'
import ToDoBox from "./ToDoBox.js"
import ToDoItem from "./ToDoItem.js"
import "./App.css"
import "./reset.css"
import "normalize.css"


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodo: "hello",
      todoList: [
        {
          id: 1,
          title: "first",
          deleted: false
        }
      ]
    }
  }

  render() {
    let todos = this.state.todoList.map((item, index) => {
      return <li>{item.title}</li>
    })
    console.log(todos);
    return (<div className="App">
      <h1>a to-do list</h1>
      <div className="inputBox">
        <ToDoBox content={this.state.newTodo}/>
      </div>
      <ToDoItem content={todos}/>
    </div>);
  }
}

export default App;
