import { Component } from 'react'
import { View } from '@tarojs/components'
import './index.scss'

class Template extends Component<any> {

  render () {
    return (
      <View className={`energy ${this.props.attr}`}></View>
    )
  }
}

export default Template

