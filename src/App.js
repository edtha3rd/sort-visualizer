import React, { Component } from 'react'

//algorithms
import BubbleSort from './algorithms/BS'

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
    count: 15,
    delay: 250,
    algorithm: 'Bubble Sort',
    timeouts: [],
  }

  ALGORITHMS = {
    'Bubble Sort': BubbleSort,
  }

  componentDidMount() {
    this.genRandomArray()
  }

  genRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
  }

  genRandomArray = () => {
    this.clearTimeouts()
    this.clearColorCode()
    const count = this.state.count
    const temp = []

    for (let i = 0; i < count; i++) {
      temp.push(this.genRandomNumber(50, 200))
    }

    this.setState(
      {
        array: temp,
        arraySteps: [temp],
        currentStep: 0,
      },
      () => {
        this.genSteps()
      }
    )
  }

  genSteps = () => {
    let array = this.state.array.slice()
    let steps = this.state.arraySteps.slice()
    let colorSteps = this.state.colorSteps.slice()

    this.ALGORITHMS[this.state.algorithm](array, 0, steps, colorSteps)

    this.setState({
      arraySteps: steps,
      colorSteps: colorSteps,
    })
  }

  clearTimeouts = () => {
    this.state.timeouts.forEach((timeout) => clearTimeout(timeout))
    this.setState({
      timeouts: [],
    })
  }

  clearColorCode = () => {
    let blankCode = new Array(this.state.count).fill(0)
    this.setState({
      colorCodes: blankCode,
      colorSteps: [blankCode],
    })
  }

  changeArray = (index, value) => {
    let arr = this.state.array
    arr[index] = value
    this.setState(
      {
        array: arr,
        arraySteps: [arr],
        currentStep: 0,
      },
      () => {
        this.genSteps()
      }
    )
  }

  previousStep = () => {
    let currentStep = this.state.currentStep
    if (currentStep === 0) {
      return
    }
    currentStep -= 1
    this.setState({
      currentStep: currentStep,
      array: this.state.arraySteps[currentStep],
      colorCodes: this.state.colorSteps[currentStep],
    })
  }

  nextStep = () => {
    let currentStep = this.state.currentStep
    if (currentStep > this.state.arraySteps.length - 1) {
      return
    }
    currentStep += 1
    this.setState({
      currentStep: currentStep,
      array: this.state.arraySteps[currentStep],
      colorCodes: this.state.colorSteps[currentStep],
    })
  }

  demo = () => {
    let steps = this.state.arraySteps
    let colorSteps = this.state.colorSteps
    this.clearTimeouts()
    let timeouts = []
    let i = 0

    while (i < steps.length - this.state.currentStep) {
      let timeout = setTimeout(() => {
        let currentStep = this.state.currentStep
        this.setState({
          array: steps[currentStep],
          colorCodes: colorSteps[currentStep],
          currentStep: currentStep + 1,
        })
        timeouts.push(timeout)
      }, this.state.delay * i)
      i++
    }
    this.setState({
      timeouts: timeouts,
    })
  }

  render() {
    let bars = this.state.array.map((value, index) => {
      return (
        <Bar
          key={index}
          index={index}
          length={value}
          color={this.state.colorCodes[index]}
          changeArray={this.changeArray}
        />
      )
    })

    let playButton

    if (this.state.arraySteps.length === this.state.currentStep) {
      playButton = (
        <button className="controller" onClick={this.genRandomArray}>
          <MdRotateLeft />
        </button>
      )
    } else {
      playButton = (
        <button className="controller" onClick={this.demo}>
          <MdPlayCircleOutline />
        </button>
      )
    }

    return (
      <div className="App">
        <div className="frame">
          <div className="barsDiv container card">{bars}</div>
        </div>
        <div>
          <h2>Current algorithm is: {this.state.algorithm}</h2>
        </div>
        <div className="control-panel">
          <div className="control-buttons">
            <button className="controller" onClick={this.previousStep}>
              <MdFastRewind />
            </button>
            {playButton}
            <button className="controller" onClick={this.nextStep}>
              <MdFastForward />
            </button>
          </div>
        </div>
        <div className="panel"></div>
        <div className="footer">
          <p className="footerText">
            3D Sorting Algorithm Visualizer - Tawanda Munongo, 2022
          </p>
        </div>
      </div>
    )
  }
}

export default App
