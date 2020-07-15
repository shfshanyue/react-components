import React, { PropTypes, PureComponent } from 'react'
import './index.css'

import Ring from '../Ring'
import Player from '../Player'

class RingPlayer extends PureComponent {
  static propTypes = {
    src: PropTypes.string,
    width: PropTypes.number.isRequired,
    paused: PropTypes.bool,
    onChange: PropTypes.func
  }

  static defaultProps = {
    width: 80 
  }

  constructor (prop) {
    super(prop) 
    this.state = {
      duration: 1,
      currentTime: 0
    }

    this.handleToggleStatus = this.handleToggleStatus.bind(this)
    this.handleData = this.handleData.bind(this)
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this)
  }

  handleToggleStatus () {
    const { onChange } = this.props
    onChange && onChange() 
  }

  handleData ({ duration }) {
    this.setState({
      duration 
    }) 
  }

  handleTimeUpdate (currentTime) {
    this.setState({
      currentTime
    })
  }

  render () {
    const { duration, currentTime } = this.state
    const { paused, src, width } = this.props

    const btnClass = `ring-player-btn ${paused ? 'play' : 'pause'}`
    const percent = currentTime / duration * 100

    return (
      <Player src={src} paused={paused} onEnded={this.handleToggleStatus} onTimeUpdate={this.handleTimeUpdate} onData={this.handleData}>
        <div className="ring-player" style={{ width: `${width}px`, height: `${width}px` }}>
          <Ring radius={(width - 10) / 2.3} ringWidth={5} width={width - 10} percent={percent}>
            <div
              className={btnClass}
              onClick={this.handleToggleStatus}
            />
          </Ring>
        </div>
      </Player>
    ) 
  }
}

export default RingPlayer

