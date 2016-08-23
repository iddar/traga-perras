
import React, { Component } from 'react'
import _ from 'lodash'
import style from './style.css'

const end = [500, 750]

class MainSection extends Component {
  constructor (props, context) {
    super(props, context)
    this.time = 100
    this.aniamtion = setInterval(this.renderImages.bind(this), this.time)
    this.timer = setInterval(this.changeTimer.bind(this), 1500)
    this.state = {
      position: 0,
      item: 0
    }
  }

  changeTimer () {
    clearInterval(this.aniamtion)
    this.time = this.time * 1.5
    let fix = 1.1 + (_.random(1, 5) / 100)
    this.aniamtion = setInterval(this.renderImages.bind(this), this.time * fix)

    if (this.time > end[_.random(0, 1)]) {
      clearInterval(this.aniamtion)
      clearInterval(this.timer)
      this.props.onFinish(this.state.item)
    }
  }

  renderImages () {
    let { position } = this.state
    position = position >= 100 ? 0 : position
    this.setState({
      position: position + 1,
      item: _.random(0, 3)
    })
  }

  componentWillUnmount () {
    clearInterval(this.aniamtion)
    clearInterval(this.timer)
  }

  render () {
    let { position, item } = this.state
    let { catalog } = this.props

    return (
      <div className={style.imageBox}>
        <img key={position} className='animated flipInX' src={catalog[item].img} />
      </div>
    )
  }
}

export default MainSection
