import React, {Component} from 'react'

function ToDoBox(props){
  return (<input type="text" defaultValue={props.content}/>)
}

export default ToDoBox
