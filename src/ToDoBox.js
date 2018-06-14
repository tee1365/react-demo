import React, {Component} from "react";
import "./ToDoBox.css";

class ToDoBox extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this); //事件处理时调用bind
    this.changeContent = this.changeContent.bind(this);
  }
  render() {
    return (
      <input
        className="ToDoBox"
        type="text"
        value={this.props.content}
        onChange={this.changeContent}
        onKeyPress={this.submit}
      />
    );
  }
  submit(e) {
    if (e.key === "Enter") {
      this.props.onSubmit(e);
    }
  }
  changeContent(e) {
    this.props.onChange(e);
  }
}

export default ToDoBox;
