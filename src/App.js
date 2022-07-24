import React, { Component } from 'react'

//icons
import {
  MdFastForward,
  MdFastRewind,
  MdPlayCircleOutline,
  MdRotateLeft,
} from 'react-icons/md'

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

  changeArray = (index, value) => {
    let arr = this.state.array
    arr[index] = value
    this.setState({
      array: arr,
      arraySteps: [arr],
      currentStep: 0,
    })
  }

  render() {
    let bars = this.state.array.map((value, index) => {
      return (
        <Bar
          key={index}
          index={index}
          length={value}
          color={0}
          changeArray={this.changeArray}
        />
      )
    })

    let playButton
    if (this.state.arraySteps.length === this.state.currentStep) {
      playButton = (
        <button className="controller">
          <MdRotateLeft />
        </button>
      )
    } else {
      playButton = (
        <button className="controller">
          <MdPlayCircleOutline />
        </button>
      )
    }

    return (
      <div className="App">
        <div className="frame">
          <div className="barsDiv container card">{bars}</div>
        </div>
        <div className="control-panel">
          <div className="control-buttons">
            <button className="controller">
              <MdFastRewind />
            </button>
            {playButton}
            <button className="controller">
              <MdFastForward />
            </button>
          </div>
        </div>
        <div className="panel"></div>
      </div>
    )
  }
}

export default App
