import React, { useState } from 'react'
import './Bar.css'

function Bar({ index, length, color }) {
  const [len, setLen] = useState(length)

  const barStyle = {
    height: length,
  }

  const colors = [
    ['rgba(61,90,241,0.5)', 'rgba(61,90,241,0.2)'],
    ['rgba(255, 48, 79, 1)', 'rgba(255, 48, 79, 1)'],
    ['rgba(131, 252, 90, 0.5', 'rgba(131, 252, 90, 0.5'],
  ]

  //styles
  const bottom_front = {
    backgroundColor: `${colors[color][0]}`,
    boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
    transform: `translateY(${200 - length}px) rotateX(-90deg)`,
    transition: '0.3s',
  }

  const inputStyle = {
    border: 'none',
    left: -Math.floor(length / 2) + 10,
    position: 'relative',
    top: Math.floor(length / 2) - 10,
    width: length,
  }

  const left_right = {
    height: `${length}px`,
    transform: `translateY(${200 - length}px)`,
    backgroundColor: `${colors[color][0]}`,
    boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
    transition: '0.3s',
  }

  const handleChange = (e) => {
    let val = e.target.value
    if (val === '') {
      setLen(0)
    } else {
      val = parseInt(val)
      if (val > 200) {
        setLen(200)
      } else {
        setLen(val)
      }
    }
    setLen(parseInt(e.target.value))
  }

  return (
    <>
      <div className="bar" style={barStyle}>
        <div className="side top"></div>
        <div className="side bottom" style={bottom_front}></div>
        <div className="side right">
          <div className="color-bar right-color-bar" style={left_right}></div>
        </div>
        <div className="side left">
          <div className="color-bar right-color-left" style={left_right}></div>
        </div>
        <div className="side front">
          <div className="color-bar front-color-bar" style={bottom_front}></div>
          <input
            className="input"
            type="number"
            length={length}
            style={inputStyle}
            value={length}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="side back">
        <div className="color-bar back-color-bar" style={bottom_front}></div>
      </div>
    </>
  )
}

export default Bar
