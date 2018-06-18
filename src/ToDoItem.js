// import React, {Component} from "react";
// import "./ToDoItem.css";
// class ToDoItem extends Component {
//   render() {
//     return (
//       <div className="ToDoItem">
//         <input
//           className="ToDoItem-checkbox"
//           type="checkbox"
//           checked={this.props.todo.status === "completed"}
//           onChange={this.toggle.bind(this)}
//         />
//         <span className="ToDoItem-title">{this.props.todo.title}</span>
//         <button className="ToDoItem-button" onClick={this.delete.bind(this)}>
//           x
//         </button>
//       </div>
//     );
//   }
//
//   toggle(e) {
//     this.props.onToggle(e, this.props.todo);
//   }
//
//   delete(e) {
//     this.props.onDelete(e, this.props.todo);
//   }
// }
// export default ToDoItem;

import React from "react";
import "./ToDoItem.css";

const ToDoItem = props => {
  return (
    <div className="ToDoItem">
      <label className="ToDoItem-container">
        <input
          className="ToDoItem-checkbox"
          type="checkbox"
          checked={props.todo.status === "completed"}
          onChange={e => {
            props.toggleItem(e, props.todo, props.index);
          }}
        />
        <span className="ToDoItem-checkmark" />
      </label>
      <span className="ToDoItem-title">{props.todo.title}</span>
      <button
        className="ToDoItem-button"
        onClick={e => {
          props.deleteItem(e, props.todo);
        }}
      >
        delete
      </button>
    </div>
  );
};

export default ToDoItem;
