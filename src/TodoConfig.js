import React, {Component} from "react";
import "./TodoConfig.css";

class TodoConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "hide"
    };
  }

  render() {
    return (
      <div className="todo-config">
        <button
          className="todo-config-button"
          onClick={e => {
            let stateCopy = copyState(this.state);
            stateCopy.status = stateCopy.status === "hide" ? "" : "hide";
            this.setState(stateCopy);
          }}
        >
          |||
        </button>
        {this.state.status === "hide" ? (
          <ul className="todo-config-list">
            <li onClick={this.props.clearList.bind(this)}>清空列表</li>
            <li
              className="todo-config-logout"
              onClick={this.props.logOut.bind(this)}
            >
              登出
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}

function copyState(state) {
  return JSON.parse(JSON.stringify(state));
}

export default TodoConfig;
