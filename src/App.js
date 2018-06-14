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
      newTodo: "",
      todoList: []
    }
  }

  render() {
    let todos = this.state.todoList.map((item, index) => {
      return (<li key={index}><ToDoItem content={item}/></li>)
    })

    console.log(todos);

    return (<div className="App">
      <h1>a to-do list</h1>
      <div className="inputBox">
        <ToDoBox content={this.state.newTodo} onSubmit={this.addToDo.bind(this)}/>
      </div>
      {todos}
    </div>)
  }

  addToDo(e) {
    this.state.todoList.push({id: idMaker(), title: e.target.value, status: null, deleted: false})
    this.setState({newTodo: "", todoList: this.state.todoList})
  }
}

export default App;

let id = 0

function idMaker() {
  id++
  return id
}
