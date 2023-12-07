// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  minutes: 25,
  seconds: 0,
  startClock: false,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.interValid)

  onMinusButton = () => {
    const {minutes} = this.state
    if (minutes > 1) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
      }))
    }
  }

  onPlusButton = () => {
    this.setState(prevState => ({
      minutes: prevState.minutes + 1,
    }))
  }

  renderTimeLimitController = () => {
    const {minutes, seconds} = this.state
    const isButtonDisabled = seconds > 0

    return (
      <div>
        <p className="set-timer"> Set Timer Limit </p>
        <div className="timer-increment-container">
          <button
            className="minus-button"
            type="button"
            onClick={this.onMinusButton}
            disabled={isButtonDisabled}
          >
            -
          </button>
          <div>
            <p className="timer-count"> {minutes} </p>
          </div>
          <button
            className="plus-button"
            type="button"
            onClick={this.onPlusButton}
            disabled={isButtonDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  timerCount = () => {
    const {minutes, seconds} = this.state
    const isTimerCompleted = seconds === minutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({startClock: false})
    } else {
      this.setState(prevState => ({
        seconds: prevState.seconds + 1,
      }))
    }
  }

  onStartOrPauseButton = () => {
    const {startClock, minutes, seconds} = this.state
    const isTimerCompleted = seconds === minutes * 60
    if (isTimerCompleted) {
      this.setState({seconds: 0})
    }
    if (startClock) {
      this.clearTimerInterval()
    } else {
      this.interValid = setInterval(this.timerCount, 1000)
    }
    this.setState(prevState => ({startClock: !prevState.startClock}))
  }

  onResetButton = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  renderTimeController = () => {
    const {startClock} = this.state
    const imageUrl = startClock
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const pauseOrStartAlt = startClock ? 'pause icon' : 'play icon'

    return (
      <div className="start-reset-container">
        <button
          type="button"
          className="start-button"
          onClick={this.onStartOrPauseButton}
        >
          <img src={imageUrl} alt={pauseOrStartAlt} className="icon-image" />
          <p className="pause-text"> {startClock ? 'Pause' : 'Start'} </p>
        </button>
        <button
          type="button"
          className="start-button"
          onClick={this.onResetButton}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="icon-image"
          />
          <p className="reset-text"> Reset </p>
        </button>
      </div>
    )
  }

  elapsedTimer = () => {
    const {minutes, seconds} = this.state
    const remainingSeconds = minutes * 60 - seconds

    const minTimer = Math.floor(remainingSeconds / 60)
    const secTimer = Math.floor(remainingSeconds % 60)
    const stringifiedMin = minTimer > 9 ? minTimer : `0${minTimer}`
    const stringifiedSec = secTimer > 9 ? secTimer : `0${secTimer}`

    return `${stringifiedMin}:${stringifiedSec}`
  }

  render() {
    const {startClock} = this.state
    const labelText = startClock ? 'Running' : 'paused'

    return (
      <div className="container">
        <div className="bg-container">
          <h1 className="timer-heading"> Digital Timer </h1>
          <div className="timer-container">
            <div className="timer-cont">
              <div className="timer">
                <h1 className="timer-clock"> {this.elapsedTimer()} </h1>
                <p className="timer-text"> {labelText} </p>
              </div>
            </div>
            <div className="timer-setting-container">
              {this.renderTimeController()}
              {this.renderTimeLimitController()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
