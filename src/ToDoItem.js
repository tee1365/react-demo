import React, {Component} from "react";

class ToDoItem extends Component {
  render() {
    return <div>{this.props.content.title}</div>;
  }
}

export default ToDoItem;
