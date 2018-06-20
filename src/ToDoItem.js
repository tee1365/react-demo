import React, {Component} from "react";
import "./ToDoItem.css";
class ToDoItem extends Component {
  render() {
    return (
      <div
        className="ToDoItem"
        ref={el => {
          this._item = el;
        }}
      >
        <label className="ToDoItem-container">
          <input
            className="ToDoItem-checkbox"
            type="checkbox"
            checked={this.props.todo.status === "completed"}
            onChange={e => {
              this.props.toggleItem(e, this.props.todo);
              // this.changeStyle(e, this.props.todo);
            }}
          />
          <span className="ToDoItem-checkmark" />
        </label>
        <span
          className="ToDoItem-title"
          ref={el => {
            this._title = el;
          }}
        >
          {this.props.todo.title}
        </span>
        <button
          className="ToDoItem-button"
          onClick={e => {
            this.props.deleteItem(e, this.props.todo);
          }}
        >
          delete
        </button>
      </div>
    );
  }

  // changeStyle(e, todo) {
  //   const uncheckedStyle = {
  //     backgroundColor:"#ccc",
  //     textDecoration:"none"
  //   }
  //   const checkedStyle = {
  //     backgroundColor:"lightblue",
  //     textDecoration:"line-through"
  //   }
  //   this.props.todo.status === "completed"
  //     ? (this._item.style= uncheckedStyle)
  //     : (this._item.style = checkedStyle);
  // }
}
export default ToDoItem;
