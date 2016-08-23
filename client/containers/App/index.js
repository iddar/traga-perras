
import React, { Component } from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Roll from '../../components/Roll'

import * as TodoActions from '../../actions/todos'
import style from './style.css'

const socket = require('socket.io-client')('http://localhost:8000')
const catalog = require('../../constants/options')

class App extends Component {

  constructor (props, context) {
    super(props, context)

    let newGame = this.newGame.bind(this)

    socket.on('coin', () => {
      if (this.state.finish || this.state.first) {
        console.warn('coin')
        newGame(this)
        this.setState({first: false})
      }
    })

    this.results = [null, null, null]
    this.state = {
      game: 0,
      first: true,
      finish: false,
      win: false
    }
  }

  onFinish (position, value) {
    this.results[position] = value
    if (!this.results.some(e => e === null)) {
      let isWin = this.results.every(e => this.results[0] === e)

      const data = {
        finish: true,
        win: isWin
      }

      this.setState(data)
      socket.emit('finish', {...data, results: this.results, win: isWin})
    }
  }

  newGame () {
    console.warn('new....');
    this.results = [null, null, null]
    var game

    do {
      game = _.random(1, 10)
    } while (game === this.state.game)

    this.setState({
      game: game,
      finish: false
    })
  }

  getText () {
    let results = this.results
    let text = `${catalog.caras[results[0]].text} ${catalog.cuerpo[results[1]].text} ${catalog.patas[results[2]].text}`

    return _.capitalize(text)
  }

  render () {
    let { game, finish } = this.state

    return (
      <div className={style.content} key={game}>
        <div className={style.screen}>
          <Roll onFinish={this.onFinish.bind(this, 0)} catalog={catalog.caras} />
          <Roll onFinish={this.onFinish.bind(this, 1)} catalog={catalog.cuerpo} />
          <Roll onFinish={this.onFinish.bind(this, 2)} catalog={catalog.patas} />
        </div>

        {/* <div className={style.result}>{finish && this.getText()}</div>

        <a onClick={finish ? this.newGame.bind(this) : null}>New game</a> */}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    todos: state.todos
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
