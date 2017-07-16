import React from 'react'

import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withKnobs, text, boolean, number, color } from '@storybook/addon-knobs'

import Ring from '../src/Ring'

addDecorator(withKnobs)

storiesOf('Ring', module)
  .add('with percent', () => {
    const percent = number('Percent', 60, {
      range: true,
      min: 0,
      max: 100,
      step: 1
    })
    const ringWidth = number('RingWidth', 10)
    const theme = color('Theme', '#eee')
    const _color = color('Color', '#fa8c35')
    return <Ring percent={percent} theme={theme} color={_color} ringWidth={ringWidth} />
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
        <div style={{ color: 'green', fontSize: '30px' }}>{percent}%</div>
      </Ring>
    )
  })

