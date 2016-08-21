
import React, { Component } from 'react'
import _ from 'lodash'
import style from './style.css'

const catalog = [
  'https://pbs.twimg.com/profile_images/603255697002790912/dSoMJigf.jpg',
  'https://pbs.twimg.com/profile_images/676801385405538304/M8hgumGw.jpg',
  'http://ichef.bbci.co.uk/news/624/cpsprodpb/4232/production/_90464961_55d-394fda8f2225.jpg'
]

const end = [500, 750]

class MainSection extends Component {
  constructor (props, context) {
    super(props, context)
    this.time = 100
    this.aniamtion = setInterval(this.renderImages.bind(this), this.time)
    this.timer = setInterval(this.changeTimer.bind(this), 1500)
    this.state = {
      position: 0
    }
  }

  changeTimer () {
    clearInterval(this.aniamtion)
    this.time = this.time * 1.5
    this.aniamtion = setInterval(this.renderImages.bind(this), this.time * 1.1)

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
      item: _.random(0, 2)
    })
  }

  // renderImages () {
  //   return _.map([1, 2, 3], (position) => {
  //     return <img key={position} src={`http://lorempixel.com/250/250/cats/?q=${position}`} />
  //   })
  // }

  render () {
    let { position, item } = this.state

    return (
      <div className={style.imageBox}>
        <img key={position} className='animated flipInX' src={catalog[item]} />
      </div>
    )
  }
}

export default MainSection
