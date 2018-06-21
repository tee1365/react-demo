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
          if (e.key === "Enter" && e.target.value.trim() !== "") {
            props.submitBox(e);
          }
        }}
      />
    </div>
  );
};

export default ToDoBox;
