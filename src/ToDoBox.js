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

const ToDoBox = (props)=>{
      return (
        <input
          className="ToDoBox"
          type="text"
          value={props.content}
          onChange={e=>{props.changeBox(e)}}  // 触发onChange时通过回调函数传给父组件
          onKeyPress={e=>{e.key === "Enter"&&props.submitBox(e)}}
        />
      );
}

export default ToDoBox;
