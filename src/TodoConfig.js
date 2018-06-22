import React, {Component} from "react";
import "./TodoConfig.css";

class TodoConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
    let clickfn;
  }

  componentDidMount() {
    let button = document.querySelector(".todo-config-button");
    this.clickfn = document.addEventListener("click", e => {
      if (e.target === button) {
        let stateCopy = copyState(this.state);
        stateCopy.status = "show";
        this.setState(stateCopy);
      } else {
        let stateCopy = copyState(this.state);
        stateCopy.status = "";
        this.setState(stateCopy);
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.clickfn);
  }

  render() {
    return (
      <div className="todo-config">
        <button className="todo-config-button">|||</button>
        {this.state.status === "" ? null : (
          <ul className="todo-config-list">
            <li onClick={this.props.clearList.bind(this)}>清空列表</li>
            <li
              className="todo-config-logout"
              onClick={this.props.logOut.bind(this)}
            >
              登出
            </li>
          </ul>
        )}
      </div>
    );
  }
}

function copyState(state) {
  return JSON.parse(JSON.stringify(state));
}

export default TodoConfig;
