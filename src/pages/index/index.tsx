import Taro from '@tarojs/taro'
import { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, ScrollView, Checkbox } from '@tarojs/components'
import { RootState } from '../../core/reducers'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import './index.scss'
import { wxLogin, getPokemonRank, getPokemonFilter } from "../../core/actions/home"
import { Card, Card_skills } from '../../core/typescript/cards'
import { isEqual } from '../../plugins/deepEqual'
import Drawer from '../../components/Drawer/index'
import Attribute from '../../components/attribute'

type StateProps = {
  cards: Card[]
  filter: any
}

type DispatchProps = {
  getPokemonRank(page: number, pageSize: number): any
  getPokemonFilter(): any
  wxLogin(): void
}
type PageOwnProps = {}

type IProps = StateProps & DispatchProps & PageOwnProps

type State = {
  page: number
  limit: number
  isFiltersButton: Boolean
  isFilters: Boolean
  scrollTop: number
  scrollCurr: number
}

interface Index {
  props: IProps
}

class Index extends Component<IProps> {

  state: State = {
    page: 1,
    limit: 10,
    isFiltersButton: true,
    isFilters: false,
    scrollTop: 0,
    scrollCurr: 0
  }


  async componentDidMount() {
    await this.props.wxLogin()

    await this.props.getPokemonRank(this.state.page, this.state.limit)
    await this.props.getPokemonFilter()
  }

  componentWillReceiveProps(next) {
    if (!isEqual(next.filter, this.props.filter)) {
      this.setState({
        page: 1,
        scrollTop: Math.random()
      })
    }
  }

  bindScroll(e) {
    this.setState({
      isFiltersButton: e.detail.deltaY > 0,
      scrollCurr: e.detail.scrollTop
    })
  }

  toCardDetail(id: number) {
    Taro.navigateTo({
      url: `../cardDetail/index?id=${id}`,
    })
  }

  async onScrollToLower() {
    Taro.showLoading({
      title: '加载中~',
      mask: false
    })
    const { page, limit } = this.state
    try {
      await this.props.getPokemonRank(page + 1, limit)
      Taro.hideLoading()
      this.setState({
        page: page + 1
      })
    } catch (error) {
      Taro.hideLoading()
      Taro.showToast({
          title:'加载失败' + error,
          duration:1000,
          icon: 'none',
          mask: false,
      })
    }
  }

  onSwitchFilter(e) {
    this.setState({
      isFilters: !this.state.isFilters
    })
  }

  scrollToTop() {
    this.setState({
      scrollTop: Math.random()
    })
  }


  render () {
    const { cards } = this.props
    const { isFilters, isFiltersButton, scrollTop, scrollCurr } = this.state

    return (
      <View className='index-page'>
        <Drawer></Drawer>
        <View className="pokemon-list">
          <ScrollView
            className="scrollview"
            scrollY
            scrollWithAnimation
            scrollTop={scrollTop}
            onScroll={this.bindScroll.bind(this)}
            enableBackToTop={true}
            onScrollToLower={this.onScrollToLower.bind(this)}
          >
            <View className="content">
              {cards && cards.map((res: Card, index: number) => {
                return (
                  <View
                    className="pokemon"
                    key={index}
                    onClick={this.toCardDetail.bind(this, res.id)}
                  >
                    <Image src={res.card_image_url} mode="aspectFill"></Image>
                    <Text className="name">{res.card_name}</Text>
                    <Attribute attr={res.card_attr}></Attribute>
                  </View>
                )})}
              {!cards && (
                <View className="pokemon">
                  <View className="information">
                    <View className="title invalid">Not found</View>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}


function mapStateToProps(state: RootState): StateProps {
  return {
    cards: state.HomeReducer.pokemonRank,
    filter: state.HomeReducer.filter
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, null, AnyAction>): DispatchProps => {
  return {
    wxLogin: () => {
      return dispatch(wxLogin())
    },
    getPokemonRank: (page, pageSize) => {
      return dispatch(getPokemonRank(page, pageSize))
    },
    getPokemonFilter: () => {
      return dispatch(getPokemonFilter())
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Index)

