import React, { PureComponent, PropTypes } from 'react'

class Player extends PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    start: PropTypes.number,
    end: PropTypes.number,
    paused: PropTypes.bool,
    onEnded: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    onError: PropTypes.func,
    onData: PropTypes.func              // loadedmetadata event
  }

  static defaultProps = {
    paused: true 
  }

  constructor (prop) {
    super(prop) 

    this.handleTimeUpdate = this.handleTimeUpdate.bind(this)
    this.handleEnd = this.handleEnd.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  componentDidMount () {
    const { onData } = this.props

    this.audio = new Audio(this.props.src)

    this.audio.addEventListener('timeupdate', this.handleTimeUpdate)     
    this.audio.addEventListener('ended', this.handleEnd)     
    this.audio.addEventListener('error', this.handleError)
    this.audio.addEventListener('loadedmetadata', () => {
      onData && onData({ duration: this.audio.duration }) 
    }, { once: true })
    this.audio.addEventListener('canplaythrough', () => {
      this.checkAudioStatus()
    })
  }

  componentDidUpdate () {
    this.checkAudioStatus()
  }

  componentWillUnmount () {
    this.audio.removeEventListener('timeupdate', this.handleTimeUpdate)     
    this.audio.removeEventListener('ended', this.handleEnd)     
    this.audio.removeEventListener('error', this.handleError)
  }

  handleTimeUpdate (e) {
    const { onTimeUpdate } = this.props
    onTimeUpdate && onTimeUpdate(e.target.currentTime)
  }

  handleEnd () {
    const { onEnded } = this.props
    onEnded && onEnded()
  }

  handleError (e) {
    const { onError } = this.props
    onError && onError(e.target.error.message)
  }

  checkAudioStatus () {
    this.props.paused ? this.audio.pause() : this.audio.play()
  }

  render () {
    return this.props.children || null
  }
}

export default Player

