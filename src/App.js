import React, { Component } from 'react'

//local imports
import Bar from './components/Bar'

//style
import './App.css'

class App extends Component {
  state = {
    array: [],
    arraySteps: [],
    colorCodes: [],
    colorSteps: [],
    currentStep: 0,
    count: 10,
    delay: 100,
    algorithm: '',
    timeouts: [],
  }

  componentDidMount() {
    this.genRandomArray()
  }

  genRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
  }

  genRandomArray = () => {
    const count = this.state.count
    const temp = []

    for (let i = 0; i < count; i++) {
      temp.push(this.genRandomNumber(50, 200))
    }

    this.setState({
      array: temp,
      arraySteps: [temp],
    })
  }

  render() {
    let bars = this.state.array.map((value, index) => {
      return <Bar key={index} index={index} length={value} color={1} />
    })
    return <div className="app">{bars}</div>
  }
}

export default App
