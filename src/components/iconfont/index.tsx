import Taro from '@tarojs/taro'
import { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from '@tarojs/components'
import { RootState } from '../../core/reducers'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import './index.scss'

type StateProps = {}

type DispatchProps = {}

type PageOwnProps = {
  type: string
}

type IProps = StateProps & DispatchProps & PageOwnProps

interface Iconfont {
  props: IProps
}

class Iconfont extends Component<IProps> {

  render () {
    return (
      <View className={`iconfont icon icon-${this.props.type}`}></View>
    )
  }
}

function mapStateToProps(state: RootState): StateProps {
  return {}
}


const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, null, AnyAction>): DispatchProps => {
  return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Iconfont)

