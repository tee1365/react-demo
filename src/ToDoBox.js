import React, {Component} from 'react'

class ToDoBox extends Component {
  render() {
    return (<input type="text" defaultValue={this.props.content} onKeyPress={this.submit}/>)
  }
  submit(e) {
    if (e.key === "Enter") {
      console.log("enter pressed");
    }
  }
}

export default ToDoBox
