import React from 'react'; // 为什么要 import React
class Welcome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date().toLocaleString(),
      test: '1'
    }
    setInterval(() => {
      this.setState({date: new Date().toLocaleString()})
    }, 1000)
    console.log("initialised");
  }

  componentWillMount() {
    console.log("componentWillMount")
    this.setState({date: new Date().toLocaleString(), test: "componentWillMount"})
  }

  render() {
    console.log("rendering")
    // return <h1>Hello, {this.props.name}</h1>
    return (<div>
      <h1>Hello,{this.props.name}</h1>
      <h2>{this.state.date.toString()}</h2>
      <p>{this.state.test}</p>
    </div>)
  }

  componentDidMount() {
    this.setState({date: new Date().toLocaleString(), test: "componentDidMount"})
    console.log("componentDidMount");
  }

  componentWillReceiveProps() {
    this.setState({
      date: new Date().toLocaleString(), // 更新 date
      test: 'componentWillReceiveProps'
    })
    console.log("componentWillReceiveProps");
  }
  componentWillUnmount() {
    console.log('要死了')
  }
}

export default Welcome // 为什么要 export，为什么要加 default
