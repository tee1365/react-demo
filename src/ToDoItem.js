import React, {Component} from 'react'

class ToDoItem extends Component {
  render() {
    return (<ol>{this.props.content}</ol>)
  }
}

export default ToDoItem
