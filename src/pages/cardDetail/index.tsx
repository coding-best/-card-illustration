import Taro, { getCurrentInstance } from "@tarojs/taro"
import { Component } from "react"
import { connect } from "react-redux"
import { View, Image, Text } from "@tarojs/components"
import { RootState } from "../../core/reducers"
import { ThunkDispatch } from "redux-thunk"
import { AnyAction } from "redux"
import { getPokemon } from "../../core/actions/home"
import "./index.scss"
import { Card } from "../../core/typescript/cards"

type StateProps = {
  cards: Card[]
}

type DispatchProps = {
  getPokemon(): any
}

type PageOwnProps = {}

type State = {
  card: Card
}

type IProps = StateProps & DispatchProps & PageOwnProps

interface CardDetail {
  props: IProps
}

class CardDetail extends Component<IProps> {

  state: State = {
    card: {
      id: 0,
      status: 0,
      card_style: '',
      card_image_url: '',
      card_name: '',
      card_description: '',
      card_hp: '',
      skill_one_name: '',
      skill_one_cost: '',
      skill_one_damage: '',
      skill_one_effect: '',
      skill_two_name: '',
      skill_two_cost: '',
      skill_two_damage: '',
      skill_two_effect: '',
      card_attr_weakness: '',
      card_attr_resistance: '',
      card_attr_retreat: '',
    }
  }
  componentDidMount() {
    const id = getCurrentInstance().router?.params.id
    const card = this.props.cards.find((res) => {
      return res.id === Number(id)
    })
    this.setState({ card })
  }
  render() {
    const { card } = this.state
    return (
      <View className="index">
        <View className="header">
          <View className="avatar">
            <Image src="" />
          </View>
          <View className="title">
            <View className="id">No.{card.id}</View>
            <View className="name">{card.card_name}</View>
          </View>
        </View>
        <View className="section">
          <Image
            className="card-cover"
            src={card.card_image_url}
            mode="aspectFit"
          ></Image>
        </View>
        <View className="detail">
          {/* 基本类型 */}
          <View className="basic-info">
            <View className="left">
              <Text>{card.card_description}</Text>
            </View>
            <View className="right">
              <Text>HP</Text>
              <Text>{card.card_hp}</Text>
              {card.skill_one_cost.split(" ").map((res) => {
                return <View className={`energy ${res}`}></View>
              })}
            </View>
          </View>
          {/* 技能 */}
          <View className="skill-list">
            <View className="skill">
              <View className="basic-skill">
                <View className="left">
                  {card.skill_one_cost.split(" ").map((res) => {
                    return <View className={`energy ${res}`}></View>
                  })}
                  <Text>{card.skill_one_name}</Text>
                </View>
                <View className="right">
                  <Text>{card.skill_one_damage}</Text>
                </View>
              </View>
              <Text>{card.skill_one_effect}</Text>
            </View>
          </View>
          {/* 弱点 */}
          <View className="weakness">
            <View className="title">
              <Text>弱点</Text>
              <Text>抗性</Text>
              <Text>撤退</Text>
            </View>
            <View className="content">
              <View className="weak-item">
                <View className={`energy ${card.card_attr_weakness.split(" ")[0]}}`}></View>
                <Text>{card.card_attr_weakness.split(" ")[1]}</Text>
              </View>
              <View className="weak-item">{card.card_attr_resistance}</View>
              <View className="weak-item">
                {card.card_attr_retreat.split(" ").map((res) => {
                  return <View className={`energy ${res}`}></View>
                })}
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state: RootState): StateProps {
  return {
    cards: state.HomeReducer.pokemonRank.cards
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, null, AnyAction>
): DispatchProps => {
  return {
    getPokemon: () => {
      return dispatch(getPokemon())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetail)
