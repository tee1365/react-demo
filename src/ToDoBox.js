// import React, {Component} from "react";
// import "./ToDoBox.css";
//
// class ToDoBox extends Component {
//   render() {
//     return (
//       <input
//         className="ToDoBox"
//         type="text"
//         value={this.props.content}
//         onChange={this.changeContent.bind(this)}
//         onKeyPress={this.submit.bind(this)}
//       />
//     );
//   }
//   submit(e) {
//     if (e.key === "Enter") {
//       this.props.onSubmit(e);
//     }
//   }
//   changeContent(e) {
//     this.props.onChange(e);
//   }
// }
//
// export default ToDoBox;

import React from "react";
import "./ToDoBox.css";

const ToDoBox = props => {
  return (
    <div className="ToDoBox">
      <span>你想做点什么:</span>
      <input
        type="text"
        value={props.content}
        placeholder="按Enter完成输入"
        onChange={e => {
          props.changeBox(e); // 触发onChange时通过回调函数传给父组件
        }}
        onKeyPress={e => {
          e.key === "Enter" && props.submitBox(e);
        }}
      />
    </div>
  );
};

export default ToDoBox;
