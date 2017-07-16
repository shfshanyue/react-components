import React, { Component, PropTypes } from 'react'
import './index.css'

class Ring extends Component {
  static propTypes = {
    radius: PropTypes.number.isRequired,
    ringWidth: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired
  }

  static defaultProps = {
    color: '#ffa400',
    theme: '#eee',
    radius: 60,
    ringWidth: 8,
    percent: 0
  }

  constructor (props) {
    super(props) 
    const { radius, ringWidth, width } = props
    this.width = width || (radius + ringWidth) * 2 + 10
  }

  componentDidMount () {
    this.draw()
  }

  componentWillUpdate () {
    const { radius, ringWidth, width } = this.props
    this.width = width || (radius + ringWidth) * 2 + 10
  }

  componentDidUpdate () {
    this.draw()
  }

  draw () {
    const ctx = this.canvas.getContext('2d')
    const { radius, ringWidth, percent, color, theme } = this.props
    const center = this.width / 2

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    ctx.lineWidth = ringWidth
    ctx.lineCap = 'butt'

    ctx.beginPath()
    ctx.arc(center, center, radius, 0, 2 * Math.PI)
    ctx.strokeStyle = theme
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(center, center, radius, -Math.PI * 0.5, -Math.PI * 0.5 + percent / 100 * 2 * Math.PI)
    ctx.strokeStyle = color
    ctx.stroke()
  }

  render () {
    const { radius, ringWidth, children } = this.props

    return (
      <div style={{ width: this.width, height: this.width }} className="ring">
        <canvas
          ref={el => this.canvas = el}
          width={this.width}
          height={this.width}
        />
        { children && <div className="ring-children">{ children }</div> }
      </div>
    );
  }
}

export default Ring

