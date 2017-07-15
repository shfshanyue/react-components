import React, { Component } from 'react'
import Player from './components/Player'
import Ring from './Ring'

class App extends Component {

  render () {
    // const src = new Audio('http://hq-static.smartstudy.com/media/question/p9k289r395t4xtfdcifz85mi.mp3')
    const src = 'http://hq-static.smartstudy.com/media/voice/j4idx9jy_276_oTH2XbIPdWzuuR8CEqxURdhO7sIpDTgA.mp3'
    return (
      <div>
        <Ring />
      </div>
    )
  }
}

export default App
