import React, {Component} from 'react'

class ToDoBox extends Component {
  constructor(props){
    super(props)
    this.submit = this.submit.bind(this)  //事件处理时调用bind
  }
  render() {
    return (<input type="text" defaultValue={this.props.content} onKeyPress={this.submit}/>)
  }
  submit(e) {
    if (e.key === "Enter") {
      this.props.onSubmit.call()
    }
  }
}

export default ToDoBox
