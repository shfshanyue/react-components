import React from 'react'

import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withKnobs, text, boolean, number, color } from '@storybook/addon-knobs'

import Ring from '../components/Ring'
import Player from '../components/Player'

addDecorator(withKnobs)

storiesOf('Ring', module)
  .add('with default', () => <Ring />)
  .add('with percent', () => {
    const percent = number('Percent', 60, {
      range: true,
      min: 0,
      max: 100,
      step: 1
    })
    const width = number('Width', 146)
    const ringWidth = number('RingWidth', 8)
    const theme = color('Theme', '#eee')
    const _color = color('Color', '#fa8c35')
    return <Ring percent={percent} theme={theme} color={_color} ringWidth={ringWidth} width={width} />
  })
  .add('with content', () => {
    const percent = number('Percent', 60, {
      range: true,
      min: 0,
      max: 100,
      step: 1
    })
    return <Ring percent={percent}>{percent}%</Ring>
  })
  .add('with complicated content', () => {
    const percent = number('Percent', 60, {
      range: true,
      min: 0,
      max: 100,
      step: 1
    })
    return (
      <Ring percent={percent}>
        <div style={{ color: '#fa8c35', fontSize: '30px' }}>{percent}%</div>
      </Ring>
    )
  })

storiesOf('Player', module)
  .add('with default', () => {
    const src = 'http://hq-static.smartstudy.com/media/voice/j4idx9jy_276_oTH2XbIPdWzuuR8CEqxURdhO7sIpDTgA.mp3'
    const paused = boolean('Paused', true)
    return (
      <Player src={src} paused={paused} onTimeUpdate={action('TimeUpdate')} onData={action('Data')} />
    )
  })
  .add('with error', () => {
    const src = 'http://hq-static.smartstudy.com/media/voice/4idx9jy_276_oTH2XbIPdWzuuR8CEqxURdhO7sIpDTgA.mp'
    const paused = boolean('Paused', true)
    return (
      <Player src={src} paused={paused} onError={action('Error')} />
    )
  })
  .add('with ui', () => {
    const src = 'http://hq-static.smartstudy.com/media/voice/j4idx9jy_276_oTH2XbIPdWzuuR8CEqxURdhO7sIpDTgA.mp3'
    const paused = boolean('Paused', true)
    const style = {
      width: '50px',
      height: '50px',
      display: 'inline-block',
      backgroundColor: '#fa8c35',
      borderRadius: '50%',
      cursor: 'pointer',
      color: '#fff',
      textAlign: 'center',
      lineHeight: '50px' 
    }

    return (
      <Player src={src} paused={paused}>
        <div style={style}>
          { paused ? '>' : '| |' }
        </div>
      </Player>
    )
  })
