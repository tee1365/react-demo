import React, {Component} from "react";
import "./ToDoItem.css";

class ToDoItem extends Component {
  render() {
    return (
      <div
        className={
          this.props.todo.status === "completed"
            ? "ToDoItem ToDoItem-checked"
            : "ToDoItem"
        }
        onClick={this.props.showDetails}
      >
        <label className="ToDoItem-container">
          <input
            className="ToDoItem-checkbox"
            type="checkbox"
            checked={this.props.todo.status === "completed"}
            onChange={e => {
              this.props.toggle(e, this.props.todo);
            }}
          />
          <span className="ToDoItem-checkmark" />
        </label>
        <span
          className={
            this.props.todo.status === "completed"
              ? "ToDoItem-title-checked"
              : "ToDoItem-title"
          }
        >
          {this.props.todo.title}
        </span>
        <button
          className="ToDoItem-button"
          onClick={e => {
            this.props.delete(e, this.props.todo);
          }}
        >
          删除
        </button>
      </div>
    );
  }
}
export default ToDoItem;
