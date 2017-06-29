import React, { PureComponent, PropTypes } from 'react'
import './player.css'

class Player extends PureComponent {
  static propTypes = {
    width: PropTypes.number,
    start: PropTypes.number,
    end: PropTypes.number,
    paused: PropTypes.bool,
    onChange: PropTypes.func,
    timeupdate: PropTypes.func,
    src: PropTypes.string.isRequired,
    autoplay: PropTypes.bool.isRequired,   // 主要被未受控组件使用
  }

  static defaultProps = {
    autoplay: false
  }

  constructor (prop) {
    super(prop) 
    this.controled = prop.paused !== undefined

    this.state = {
      paused: this.controled ? prop.paused : !prop.autoplay,
      progress: 0
    }

    this.handleToggleStatus = this.handleToggleStatus.bind(this)
  }

  componentDidMount () {
    this.audio = new Audio(this.props.src)

    this.handleEvents()
    this.checkAudioStatus()
  }

  componentWillReciveProps (props, state) {
    if (props.paused !== this.props.paused) {
      this.setState({ paused: props.paused }) 
    }
  }

  componentDidUpdate () {
    this.checkAudioStatus()
  }

  handleToggleStatus () {
    const { onChange } = this.props
    if (this.props.paused !== undefined) {
      onChange && onChange()
      return
    }

    const { paused } = this.state
    this.setState({ paused: !paused }) 
    onChange && onChange()
  }

  handleEvents () {
    const audio = this.audio
    const { start, end, timeupdate, ended } = this.props

    audio.addEventListener('timeupdate', (e) => {
      timeupdate && timeupdate()
    })
    audio.addEventListener('ended', (e) => {
      ended && ended()
      this.handleToggleStatus()
    })
  }

  checkAudioStatus () {
    this.state.paused ? this.audio.pause() : this.audio.play()
  }

  render () {
    const { width } = this.props
    const { paused } = this.state

    // 如果在播放状态中，播放按钮为暂停样式
    const btnClass = `player-btn ${paused ? 'play' : 'pause'}`

    return (
      <div className="player" style={{ width: `${width}px`, height: `${width}px` }}>
        <div className="player-ring">
          <div
            className={btnClass}
            onClick={this.handleToggleStatus}
          />
        </div>
      </div>
    ) 
  }
}

export default Player
