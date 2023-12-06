// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {timerLimitInMinutes: 25, isRunning: false, elapsedSeconds: 0}

  handleMinusClick = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  handlePlusClick = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  resetTimer = () => {
    clearInterval(this.timerId)
    this.setState({
      timerLimitInMinutes: 25,
      isRunning: false,
      elapsedSeconds: 0,
    })
  }

  tick = () => {
    const {timerLimitInMinutes, elapsedSeconds} = this.state
    const isTimerCompleted = timerLimitInMinutes * 60 === elapsedSeconds
    if (isTimerCompleted) {
      clearInterval(this.timerId)
      this.setState({isRunning: false, elapsedSeconds: 0})
    } else {
      this.setState(prevState => ({
        elapsedSeconds: prevState.elapsedSeconds + 1,
      }))
    }
  }

  startPauseTimer = () => {
    const {timerLimitInMinutes, isRunning, elapsedSeconds} = this.state
    const isTimerCompleted = timerLimitInMinutes * 60 === elapsedSeconds

    if (isTimerCompleted) {
      this.setState({isRunning: false, elapsedSeconds: 0})
    }
    if (isRunning) {
      clearInterval(this.timerId)
    } else {
      this.timerId = setInterval(this.tick, 1000)
    }

    this.setState(prevState => ({
      isRunning: !prevState.isRunning,
    }))
  }

  render() {
    const {timerLimitInMinutes, isRunning, elapsedSeconds} = this.state
    const totalRemainingSeconds = timerLimitInMinutes * 60 - elapsedSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const isButtonsDisabled = elapsedSeconds > 0
    return (
      <div className="background-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="bg-timer-img">
          <div className="timer">
            <h1>{`${minutes > 9 ? minutes : `0${minutes}`}:${
              seconds > 9 ? seconds : `0${seconds}`
            }`}</h1>
            <p>{isRunning ? 'Running' : 'Paused'}</p>
          </div>
        </div>
        <div>
          <div>
            {isRunning ? (
              <button onClick={this.startPauseTimer} type="button">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                  alt="pause icon"
                />
                <p>Pause</p>
              </button>
            ) : (
              <button onClick={this.startPauseTimer} type="button">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                  alt="play icon"
                />
                <p>Start</p>
              </button>
            )}

            <button onClick={this.resetTimer} type="button">
              <img
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                alt="reset icon"
              />
              <p>Reset</p>
            </button>
          </div>
          <p>Set Timer Limit</p>
          <div>
            <button
              type="button"
              onClick={this.handlePlusClick}
              disabled={isButtonsDisabled}
            >
              +
            </button>
            <p>{timerLimitInMinutes}</p>
            <button
              type="button"
              onClick={this.handleMinusClick}
              disabled={isButtonsDisabled}
            >
              -
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
