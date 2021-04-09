import Taro from "@tarojs/taro"
import { Component } from "react"
import { connect } from "react-redux"
import { View, Text, Image, ScrollView } from "@tarojs/components"
import { RootState } from "../../core/reducers"
import { ThunkDispatch } from "redux-thunk"
import { AnyAction } from "redux"
import { getPokemonRank } from "../../core/actions/home"
import { Card, Card_skills } from "../../core/typescript/cards"

import "./index.scss"

type StateProps = {
  cards: Card[]
}

type DispatchProps = {
  getPokemonRank(page: number, pageSize: number): any
}

type PageOwnProps = {}

type State = {
  page: number
}

type IProps = StateProps & DispatchProps & PageOwnProps

interface Index {
  props: IProps
}

class Index extends Component<IProps> {
  state: State = {
    page: 1
  }

  async componentDidMount() {
    await this.props.getPokemonRank(this.state.page, 10)
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
    const { page } = this.state
    try {
      await this.props.getPokemonRank(page + 1, 10)
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

  render() {
    const { cards } = this.props
    console.log(cards)
    const color = ["red", "blue", "yellow", "gray", "grass"]
    const scrollTop = 0
    return (
      <View className="index">
        <View className="pokemon-list">
          <ScrollView
            className="scrollview"
            scrollY
            scrollWithAnimation
            scrollTop={scrollTop}
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
                            <View className="capsule type-poison">{res.skill_name}</View>
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
      </View>
    )
  }
}

function mapStateToProps(state: RootState): StateProps {
  return {
    cards: state.HomeReducer.pokemonRank
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, null, AnyAction>
): DispatchProps => {
  return {
    getPokemonRank: (page, pageSize) => {
      return dispatch(getPokemonRank(page, pageSize))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
