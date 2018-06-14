import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import Welcome from "./welcome"
import App from "./App.js"

// function tick() {
//   const elem = (<div>
//     <h1>Hello,World</h1 >
//     <h2>It is {new Date().toLocaleString()}</h2>
//   </div>)
//   ReactDOM.render(elem, document.getElementById("root2"))
// }
//
// setInterval(tick, 1000)

// ReactDOM.render(
//   <Welcome name="nogizaka"/>,
//   document.getElementById("root2")
// )

ReactDOM.render(<App/>, document.getElementById("root2"))
