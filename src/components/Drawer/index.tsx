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

type PageOwnProps = {}

type IProps = StateProps & DispatchProps & PageOwnProps

interface Drawer {
  props: IProps
}

class Drawer extends Component<IProps> {
  state = {
    tab: ['系列', '宝可梦卡', '训练师卡'],
    active: false
  }

  showDrawer() {
    this.setState({
      active: !this.state.active
    })
  }

  render () {
    const { tab, active } = this.state
    return (
      <View className='drawer'>
        <View className="tab">
          {tab.map((res) => {
            return (
              <View className="tab-item" onClick={this.showDrawer.bind(this)}>
                <Text>{res}</Text>
                <View className="icon-bottom"></View>
              </View>
            )
          })}
          <View className="line"></View>
          <View className="icon-filter" onClick={this.showDrawer.bind(this)}></View>
        </View>
        <View className={`drawer-content ${active && 'active'}`}></View>
        {active && <View className="mask" onClick={this.showDrawer.bind(this)}></View>}
      </View>
    )
  }
}

function mapStateToProps(state: RootState): StateProps {
  return {}
}


const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, null, AnyAction>): DispatchProps => {
  return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Drawer)

