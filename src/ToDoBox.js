import React from "react";
import "./ToDoBox.css";

const ToDoBox = props => {
  return (
    <div className="ToDoBox">
      <span>你想做点什么:</span>
      <input
        type="text"
        value={props.newTodo}
        placeholder="按Enter完成输入"
        onChange={e => {
          props.changeContent(e); // 触发onChange时通过回调函数传给父组件
        }}
        onKeyPress={e => {
          if (e.key === "Enter" && e.target.value.trim() !== "") {
            props.addToDo(e);
          }
        }}
      />
    </div>
  );
};

export default ToDoBox;
