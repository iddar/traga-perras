
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Roll from '../../components/Roll'

import * as TodoActions from '../../actions/todos'
import style from './style.css'

class App extends Component {

  constructor (props, context) {
    super(props, context)
    this.results = []
  }

  onFinish (value) {
    this.results.push(value)
    if (this.results.length === 3) {
      let isWin = this.results.every(e => this.results[0] === e)
      console.warn(isWin)
    }
  }

  render () {
    return (
      <div className={style.content}>
        <div className={style.screen}>
          <Roll onFinish={this.onFinish.bind(this)} />
          <Roll onFinish={this.onFinish.bind(this)} />
          <Roll onFinish={this.onFinish.bind(this)} />
        </div>
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
