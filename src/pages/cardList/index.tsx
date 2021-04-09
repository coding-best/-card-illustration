import Taro from '@tarojs/taro'
import { Component } from "react"
import { connect } from "react-redux"
import { View, Text, Image } from "@tarojs/components"
import { RootState } from "../../core/reducers"
import { ThunkDispatch } from "redux-thunk"
import { AnyAction } from "redux"
import { getPokemon, getPokemonRank } from "../../core/actions/home"
import { Card } from "../../core/typescript/cards"

import "./index.scss"

type StateProps = {
  cards: Card[]
}

type DispatchProps = {
  getPokemon(): any
  getPokemonRank(page: number, pageSize: number): any
}

type PageOwnProps = {}

type State = {
  cards: Card[]
}

type IProps = StateProps & DispatchProps & PageOwnProps

interface Index {
  props: IProps
}

class Index extends Component<IProps> {
  state: State = {
    cards: [],
  }
  async componentDidMount() {
    await this.props.getPokemonRank(1, 10)
  }

  toCardDetail(id: number) {
    Taro.navigateTo({
      url: `../cardDetail/index?id=${id}`
    })
  }

  render() {
    const { cards } = this.props
    const color = ['red', 'blue', 'yellow', 'gray', 'grass']
    return (
      <View className="index">
        <View className="pokemon-list">
          {cards &&
            cards.map((res: Card, index: number) => {
              return (
                <View className={`pokemon color-${color[index % color.length]}`} key={index} onClick={this.toCardDetail.bind(this, res.id)}>
                  <View className="information">
                    <View className="title">
                      <Text className="id">No.{res.id}</Text>
                      <Text className="name">{res.card_name}</Text>
                    </View>
                    <View className="type-list">
                      <View className="capsule type-poison">{res.skill_one_name}</View>
                      {res.skill_two_name && <View className="capsule type-poison">{res.skill_two_name}</View>}
                    </View>
                  </View>
                  <View className="picture">
                    <View className="avatar">
                      <Image src={res.card_image_url} mode="aspectFill"></Image>
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
        </View>
      </View>
    )
  }
}

function mapStateToProps(state: RootState): StateProps {
  return {
    cards: state.HomeReducer.pokemonRank.cards,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, null, AnyAction>): DispatchProps => {
  return {
    getPokemon: () => {
      return dispatch(getPokemon())
    },
    getPokemonRank: (page, pageSize) => {
      return dispatch(getPokemonRank(page, pageSize))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
