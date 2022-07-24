import React, { useEffect, useState } from 'react'
import './Bar.css'

function Bar({ index, length, color, changeArray }) {
  const [len, setLen] = useState(length)

  useEffect(() => {
    setLen(length)
  }, [length])

  const colors = [
    ['rgba(61,90,241,0.5)', 'rgba(61,90,241,0.2)'],
    ['rgba(255, 48, 79, 1)', 'rgba(255, 48, 79, 1)'],
    ['rgba(131, 252, 90, 0.5', 'rgba(131, 252, 90, 0.5'],
  ]

  //styles
  const bottom = {
    backgroundColor: `${colors[color][0]}`,
    boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
    transform: `translateY(${200 - length}px) rotateX(-90deg)`,
    transition: '0.3s',
  }

  const front_back_left_right = {
    backgroundColor: `${colors[color][0]}`,
    boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
    height: `${length}px`,
    transform: `translateY(${200 - length}px)`,
    transition: '0.3s',
  }

  const inputStyle = {
    background: 'none',
    border: 'none',
    left: -Math.floor(length / 2) + 13,
    position: 'relative',
    top: Math.floor(length / 2) - 12,
    width: length,
  }

  const quantity = {
    position: 'relative',
    top: '225px',
  }

  const handleChange = (e) => {
    let val = e.target.value
    if (val === '') {
      setLen(0)
      changeArray(index, 0)
    } else {
      val = parseInt(val)
      if (val > 200) {
        setLen(200)
        changeArray(index, 200)
      } else {
        setLen(val)
        changeArray(index, val)
      }
    }
  }

  const handleIncrement = (e) => {
    setLen(len + 1)
    changeArray(index, len + 1)
  }

  const handleDecrement = (e) => {
    setLen(len - 1)
    changeArray(index, len - 1)
  }

  return (
    <>
      <div className="bar">
        <div className="side top"></div>
        <div className="side bottom" style={bottom}></div>
        <div className="side right">
          <div
            className="color-bar right-color-bar"
            style={front_back_left_right}
          ></div>
        </div>
        <div className="side left">
          <div
            className="color-bar left-color-bar"
            style={front_back_left_right}
          ></div>
        </div>
        <div className="side front">
          <div
            className="color-bar front-color-bar"
            style={front_back_left_right}
          >
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
          <div
            className="color-bar back-color-bar"
            style={front_back_left_right}
          ></div>
        </div>
        <div className="quantity-nav">
          <div
            className="quantity-button quantity-up"
            style={quantity}
            onClick={handleIncrement}
          >
            {' '}
            +{' '}
          </div>
          <div
            className="quantity-button quantity-updown"
            style={quantity}
            onClick={handleDecrement}
          >
            {' '}
            -{' '}
          </div>
        </div>
      </div>
    </>
  )
}

export default Bar
