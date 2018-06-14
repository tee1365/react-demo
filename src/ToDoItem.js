import React, {Component} from "react";

class ToDoItem extends Component {
  render() {
    return (
      <div>
        <input
          type="checkbox"
          checked={this.props.todo.status === "completed"}
          onChange={this.toggle.bind(this)}
        />
        {this.props.todo.title}
        <button onClick={this.delete.bind(this)}>x</button>
      </div>
    );
  }

  toggle(e) {
    this.props.onToggle(e, this.props.todo);
  }

  delete(e) {
    this.props.onDelete(e, this.props.todo);
  }
}

export default ToDoItem;
