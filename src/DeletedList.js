import React, {Component} from "react";
import "./DeletedList.css";

export default class DeletedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletedList: this.props.todoList.filter(function(list) {
        return list.deleted;
      })
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    let query = e.target.value;
    let stateCopy = copyState(this.state);
    stateCopy.deletedList = this.props.todoList.filter(list => {
      return list.title.includes(query) && list.deleted;
    });
    this.setState(stateCopy);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      deletedList: this.props.todoList.filter(function(list) {
        return list.deleted;
      })
    });
  }

  render() {
    let deletedListElement = this.state.deletedList.map((item, index) => {
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
          <input type="text" onChange={this.handleInput} />
        </label>
        <ul className="deletedListScrollBox">{deletedListElement}</ul>
      </div>
    );
  }
}

function copyState(state) {
  return JSON.parse(JSON.stringify(state));
}
