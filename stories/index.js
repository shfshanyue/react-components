import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import Ring from '../src/Ring'

storiesOf('Ring', module)
  .add('with text', () => <Ring />)

