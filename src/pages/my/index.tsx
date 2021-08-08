import Taro from '@tarojs/taro'
import { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Button, Image } from '@tarojs/components'
import { RootState } from '../../core/reducers'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import './index.scss'
import DEFAULT_AVATAR from '../../assets/img_avatar_default.png'
import { authLogin, authPhone } from '../../core/actions/home'

type StateProps = {}

type DispatchProps = {}

type PageOwnProps = {
  wxLogin(): void
  authLogin(e): void
  authPhone(e): void
}

type IProps = StateProps & DispatchProps & PageOwnProps

type State = {
  visible: boolean
  userInfo: any
}
interface My {
  props: IProps
}
class My extends Component<IProps> {

  state: State = {
    visible: false,
    userInfo: Taro.getStorageSync('userInfo')
  }

  async getPhoneNumber(e) {
    console.log(e.target)
    await this.props.authPhone(e.target)
    this.setState({
      visible: false
    })
  }

  async getUserInfo() {
    const e = await Taro.getUserProfile({
      desc: '用于完善资料'
    })
    await this.props.authLogin(e)
    this.setState({
      userInfo: Taro.getStorageSync('userInfo'),
      visible: true
    })
  }
  render () {
    const { visible, userInfo } = this.state
    return (
      <View className='my'>
        <View className="userinfo">
          <Image className="avatar" src={userInfo ? userInfo.avatarUrl : DEFAULT_AVATAR}></Image>
          <View className="nickname">{userInfo ? userInfo.nickName : '请登录'}</View>
          <View className="uid">{userInfo ? userInfo.id : '-'}</View>
          {!userInfo && <Button className="hide-btn" openType="getUserProfile" onClick={this.getUserInfo.bind(this)}></Button>}
        </View>
        <View className="user-content">
          <View className="item">
            <Text>200</Text>
            <Text>我的卡牌</Text>
          </View>
          <View className="item">
            <Text>100</Text>
            <Text>想要</Text>
          </View>
        </View>
        {visible && <View className="modal-dialog">
          <View className="header"></View>
          <View className="content">为正常使用小程序功能，需要您统一授权微信个人信息。</View>
          <View className="button">
            <Button className="confirm-btn" open-type='getPhoneNumber' onGetPhoneNumber={(e) => this.getPhoneNumber(e)}>确定</Button>
          </View>
        </View>}
        {visible && <View className="dialog-mask"></View>}
        {/* <Button className="confirm-btn" open-type='getPhoneNumber' onGetPhoneNumber={(e) => this.getPhoneNumber(e)}>
          <Text>确定</Text>
        </Button>
        <Button openType="getUserProfile" onClick={this.getUserInfo.bind(this)}>获取用户信息</Button> */}
      </View>
    )
  }
}

function mapStateToProps(state: RootState): StateProps {
  return {}
}


const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, null, AnyAction>): DispatchProps => {
  return {
    authLogin: (e) => {
      return dispatch((authLogin(e)))
    },
    authPhone: (e) => {
      return dispatch((authPhone(e)))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(My)

