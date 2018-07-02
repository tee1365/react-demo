import React, {Component} from "react";
import "./DeletedList.css";

export default class DeletedList extends Component {
  render() {
    let deletedList = this.props.todoList
      .filter(function(list) {
        return list.deleted;
      })
      .map((item, index) => {
        console.log(item);
        return (
          <li
            key={index}
            className={item.status === "" ? "incompleteList" : "completeList"}
          >
            <span>{item.title}</span>
            <button
              onClick={e => {
                this.props.undoDelete(e, item);
              }}
            >
              恢复
            </button>
          </li>
        );
      });

    return (
      <div className="deletedList">
        <h2>被删除项列表</h2>
        <p className="return" onClick={this.props.toggleDeletedList.bind(this)}>
          返回
        </p>
        <label className="search">
          <span>search:</span>
          <input type="text" />
        </label>
        <ul>{deletedList}</ul>
      </div>
    );
  }
}
