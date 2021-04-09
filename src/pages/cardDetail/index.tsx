import Taro, { getCurrentInstance } from "@tarojs/taro"
import { Component } from "react"
import { connect } from "react-redux"
import { View, Image, Text, ScrollView } from "@tarojs/components"
import { RootState } from "../../core/reducers"
import { ThunkDispatch } from "redux-thunk"
import { AnyAction } from "redux"
import "./index.scss"
import { Card, Card_skills } from "../../core/typescript/cards"
import { getPokemon } from "../../core/actions/home"

type StateProps = {
  cards: Card[]
}

type DispatchProps = {
  getPokemon(id: number): any
}

type PageOwnProps = {}

type State = {
  currentCard: Card
  prevCard: Card
  nextCard: Card
  id: number
  scrollTop: number
}

type IProps = StateProps & DispatchProps & PageOwnProps

interface CardDetail {
  props: IProps
}

const defaultCard = {
  id: 1,
  card_style: '',
  card_image_url: '',
  card_name: '',
  card_attr: '',
  card_icon: '',
  card_type: '',
  card_label: '',
  card_hp: '',
  card_skills: [
    {
      skill_name: '',
      skill_cost: '',
      skill_damage: '',
      skill_effect: '',
    },
  ],
  card_attr_weakness: '',
  card_attr_resistance: '',
  card_attr_retreat: ''
}

class CardDetail extends Component<IProps> {
  state: State = {
    currentCard: defaultCard,
    prevCard: defaultCard,
    nextCard: defaultCard,
    id: 0,
    scrollTop: 0,
  }

  async componentDidMount() {
    const id = Number(getCurrentInstance().router?.params.id)
    this.init(id)
  }

  // 初始化宝可梦信息
  async init(id: number) {
    // 如果在状态里边找不到，则请求单个接口获取详情
    const curr =
      this.props.cards.find((res) => res.id === id) ||
      (await this.props.getPokemon(id))
    const prev =
      this.props.cards.find((res) => res.id === id - 1) ||
      (await this.props.getPokemon(id - 1))
    const next =
      this.props.cards.find((res) => res.id === id + 1) ||
      (await this.props.getPokemon(id + 1))
    this.setState({
      currentCard: curr,
      prevCard: prev,
      nextCard: next,
      id: id,
      scrollTop: Math.random(),
    })
  }

  toPrev() {
    const id = this.state.id - 1
    this.init(id)
  }

  toNext() {
    const id = this.state.id + 1
    this.init(id)
  }

  render() {
    const {
      currentCard: card,
      prevCard: prev,
      nextCard: next,
      scrollTop,
    } = this.state
    return (
      <View className="index">
        <ScrollView
          className="scrollview"
          scrollTop={scrollTop}
          scrollY
          scrollWithAnimation
          enableBackToTop={true}
        >
          <View className="header">
            <View className="avatar">
              <Image src="" />
            </View>
            <View className="title">
              <View className="id">No.{card.id}</View>
              <View className="name">{card.card_name}</View>
            </View>
            <View className="attribute">
              <View className={`energy ${card.card_attr}`}></View>
            </View>
          </View>
          <View className="section card-cover">
            <Image src={card.card_image_url} mode="aspectFit"></Image>
          </View>
          <View className="detail">
            {/* 基本类型 */}
            <View className="basic-info">
              <View className="left">
                <Text>{card.card_type}</Text>
              </View>
              <View className="right">
                <Text>HP</Text>
                <Text>{card.card_hp}</Text>
              </View>
            </View>
            {/* 技能 */}
            <View className="skill-list">
              {card.card_skills && card.card_skills.map((res: Card_skills, index: number) => {
                return (
                  <View className="skill">
                    <View className="basic-skill">
                      <View className="left">
                        {res.skill_cost.split(" ").map((res) => {
                          return <View className={`energy ${res}`}></View>
                        })}
                        <Text>{card.card_name}</Text>
                      </View>
                      <View className="right">
                        <Text>{res.skill_damage}</Text>
                      </View>
                    </View>
                    {res.skill_effect && (
                      <Text className="effect">{res.skill_effect}</Text>
                    )}
                  </View>
                )
              })}
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
                  <View
                    className={`energy ${
                      card.card_attr_weakness.split(" ")[0]
                    }}`}
                  ></View>
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
            {/* 附近的宝可梦 */}
            <View className="section pokemons">
              <View className="paginations">
                {prev && (
                  <View className="previous" onClick={this.toPrev.bind(this)}>
                    <View className="iconfont icon icon-left"></View>
                    <View className="avatar">
                      <Image src={prev.card_image_url} mode="aspectFit" />
                    </View>
                  </View>
                )}
                {next && (
                  <View className="next" onClick={this.toNext.bind(this)}>
                    <View className="avatar">
                      <Image src={next.card_image_url} mode="aspectFit" />
                    </View>
                    <View className="iconfont icon icon-right"></View>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state: RootState): StateProps {
  return {
    cards: state.HomeReducer.pokemonRank,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, null, AnyAction>
): DispatchProps => {
  return {
    getPokemon: (id) => {
      return dispatch(getPokemon(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetail)
