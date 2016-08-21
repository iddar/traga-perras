
import React, { Component } from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Roll from '../../components/Roll'

import * as TodoActions from '../../actions/todos'
import style from './style.css'

const catalog = [
  {
    img: 'https://pbs.twimg.com/profile_images/603255697002790912/dSoMJigf.jpg',
    text: 'uno'
  },
  {
    img: 'https://pbs.twimg.com/profile_images/676801385405538304/M8hgumGw.jpg',
    text: 'dos'
  },
  {
    img: 'http://ichef.bbci.co.uk/news/624/cpsprodpb/4232/production/_90464961_55d-394fda8f2225.jpg',
    text: 'tres'
  }
]

class App extends Component {

  constructor (props, context) {
    super(props, context)
    this.results = [null, null, null]
    this.state = {
      game: 0,
      finish: false,
      win: false
    }
  }

  onFinish (position, value) {
    this.results[position] = value
    if (!this.results.some(e => e === null)) {
      let isWin = this.results.every(e => this.results[0] === e)

      this.setState({
        finish: true,
        win: isWin
      })
    }
  }

  newGame () {
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
    let text = _.reduce(this.results, (sum, item) => {
      if (sum === '') return catalog[item].text
      return `${sum} ${catalog[item].text}`
    }, '')

    return _.capitalize(text)
  }

  render () {
    let { game, finish } = this.state

    return (
      <div className={style.content} key={game}>
        <div className={style.screen}>
          <Roll onFinish={this.onFinish.bind(this, 0)} catalog={catalog} />
          <Roll onFinish={this.onFinish.bind(this, 1)} catalog={catalog} />
          <Roll onFinish={this.onFinish.bind(this, 2)} catalog={catalog} />
        </div>

        <div className={style.result}>{finish && this.getText()}</div>

        <a onClick={finish ? this.newGame.bind(this) : null}>New game</a>
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
