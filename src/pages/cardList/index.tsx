import Taro from "@tarojs/taro"
import { Component } from "react"
import { connect } from "react-redux"
import { View, Text, Image, ScrollView } from "@tarojs/components"
import { RootState } from "../../core/reducers"
import { ThunkDispatch } from "redux-thunk"
import { AnyAction } from "redux"
import { getPokemonRank, getPokemonFilter } from "../../core/actions/home"
import { Card, Card_skills } from "../../core/typescript/cards"
import { CSSTransition } from 'react-transition-group'
import Iconfont from '../../components/iconfont'
import Filters from '../../components/filters'

import "./index.scss"
import { isEqual } from "../../plugins/deepEqual"

type StateProps = {
  cards: Card[]
  filter: any
}

type DispatchProps = {
  getPokemonRank(page: number, pageSize: number): any
  getPokemonFilter(): any
}

type PageOwnProps = {}

type State = {
  page: number
  limit: number
  isFiltersButton: Boolean
  isFilters: Boolean
  scrollTop: number
  scrollCurr: number
}

type IProps = StateProps & DispatchProps & PageOwnProps

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

  render() {
    const { cards } = this.props
    const { isFilters, isFiltersButton, scrollTop, scrollCurr } = this.state
    const color = ["red", "blue", "yellow", "gray", "grass"]
    return (
      <View className="index">
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
            {cards && cards.map((res: Card, index: number) => {
                return (
                  <View
                    className={`pokemon color-${color[index % color.length]}`}
                    key={index}
                    onClick={this.toCardDetail.bind(this, res.id)}
                  >
                    <View className="information">
                      <View className="title">
                        <Text className="id">No.{res.id}</Text>
                        <Text className="name">{res.card_name}</Text>
                      </View>
                      <View className="type-list">
                        {res.card_skills && res.card_skills.map((res: Card_skills, index: number) => {
                          return (
                            <View className={`capsule type-poison type-${res.skill_cost.split(' ')[0]}`}>{res.skill_name}</View>
                          )
                        })}
                      </View>
                    </View>
                    <View className="picture">
                      <View className="avatar">
                        <Image
                          src={res.card_image_url}
                          mode="aspectFill"
                        ></Image>
                      </View>
                    </View>
                  </View>
                )
              })}
            {!cards && (
              <View className="pokemon">
                <View className="information">
                  <View className="title invalid">Not found</View>
                </View>
              </View>
            )}
          </ScrollView>
        </View>

        <CSSTransition in={scrollCurr > 200} timeout={400} classNames="toolbar-botton" appear={true}>
          <View key="top" className="top-button" onClick={this.scrollToTop.bind(this)}>
            <Iconfont type="top"></Iconfont>
          </View>
        </CSSTransition>

        <CSSTransition in={true} timeout={400} classNames="toolbar-botton" appear={true}>
          <View key="filter" className="filter-button" onClick={this.onSwitchFilter.bind(this)}>
            <Iconfont type="filter"></Iconfont>
          </View>
        </CSSTransition>

        <Filters showFilters={isFilters} switchFilter={this.onSwitchFilter.bind(this)}></Filters>
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
    getPokemonRank: (page, pageSize) => {
      return dispatch(getPokemonRank(page, pageSize))
    },
    getPokemonFilter: () => {
      return dispatch(getPokemonFilter())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
