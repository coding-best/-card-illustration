import Taro from '@tarojs/taro'
import { Component } from 'react'
import { connect } from 'react-redux'
import { View, Button, Text } from '@tarojs/components'
import { RootState } from '../../core/reducers'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { getPokemon } from '../../core/actions/home'
import './index.scss'

type StateProps = {}

type DispatchProps = {
  getPokemon(): any
}

type PageOwnProps = {}

type IProps = StateProps & DispatchProps & PageOwnProps

interface Template {
  props: IProps
}

class Template extends Component<IProps> {
  async componentDidMount() {
    await this.props.getPokemon()
  }

  render () {
    return (
      <View className='index'>
        <View><Text>Hello, World</Text></View>
      </View>
    )
  }
}

function mapStateToProps(state: RootState): StateProps {
  return {}
}


const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, null, AnyAction>): DispatchProps => {
  return {
    getPokemon: () => {
      return dispatch(getPokemon())
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Template)

