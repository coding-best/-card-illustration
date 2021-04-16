import Taro from "@tarojs/taro"
import { Component } from "react"
import { connect } from "react-redux"
import { View, Text } from "@tarojs/components"
import { RootState } from "../../core/reducers"
import { ThunkDispatch } from "redux-thunk"
import { AnyAction } from "redux"
import Iconfont from "../iconfont"
import { CSSTransition } from "react-transition-group"
import Attribute from '../attribute'

import "./index.scss"
import { Filters } from "../../core/typescript/filters"
import { filterCondition, getPokemonRank } from "../../core/actions/home"

type StateProps = {
  filters: any
}

type DispatchProps = {
  getFilterCondition(args: any): any
  getPokemonAttr(page: number, limit: number): any
}

type PageOwnProps = {
  showFilters: Boolean
  switchFilter(): any
}

type State = {
  attrFilter: Array<Filters>
  styleFilter: Array<any>
  typeFilter: Array<Filters>
}

type IProps = StateProps & DispatchProps & PageOwnProps

interface Template {
  props: IProps
}

class Template extends Component<IProps> {
  state: State = {
    attrFilter: [],
    styleFilter: [],
    typeFilter: []
  }

  componentWillReceiveProps(next) {
    const list: any = []
    for (const key in next.filters.style_filter) {
      if (Object.prototype.hasOwnProperty.call(next.filters.style_filter, key)) {
        const element = next.filters.style_filter[key]
        list.push({key: key, value: element})
      }
    }
    this.setState({
      attrFilter: next.filters.attr_filter,
      styleFilter: list,
      typeFilter: next.filters.type_filter
    })
  }

  switchAttr(title, item) {
    this.props.getFilterCondition({title, item})
    this.props.getPokemonAttr(1, 10)

    this.props.switchFilter()
  }

  render() {
    const { showFilters, switchFilter } = this.props
    const {attrFilter, styleFilter, typeFilter} = this.state
    return (
      <CSSTransition in={showFilters} timeout={200} classNames="filter-panel" appear={true}>
        <View className="filters">
            <View className="panel">
              <View className="h2">
                <Iconfont type="filter" /> <Text>宝可梦筛选</Text>
                <View className="close" onClick={() => switchFilter()}>
                  <Iconfont type="close-selected" />
                </View>
              </View>
              <View className="filter">
                <Text className="h3">属性</Text>
                <View className="options">
                  {attrFilter && attrFilter.map((res) => {
                    return (
                      <View className="option-attr" onClick={this.switchAttr.bind(this, 'attr', res.item)}>
                        <Attribute attr={res.item}></Attribute>
                      </View>
                    )
                  })}
                </View>
              </View>
              {styleFilter && styleFilter.map((res, index) => {
                return (
                  <View className="filter" key={index}>
                    <Text className="h3">{res.key}</Text>
                    <View className="options">
                      {res && res.value.map((item) => {
                        return (
                          <View className="option" onClick={this.switchAttr.bind(this, 'style', item.item)}>
                            {/* <View className="check">
                              <Iconfont type="check" />
                            </View> */}
                            <Text>{item.name}</Text>
                          </View>
                        )
                      })}
                    </View>
                  </View>
                )
              }) }
              <View className="filter">
                <Text className="h3">类型</Text>
                <View className="options">
                  {typeFilter && typeFilter.map((res) => {
                    return (
                      <View className="option" onClick={this.switchAttr.bind(this, 'type', res.item)}>
                        {/* <View className="check">
                          <Iconfont type="check" />
                        </View> */}
                        <Text>{res.name}</Text>
                      </View>
                    )
                  })}
                </View>
              </View>
            </View>
        </View>
      </CSSTransition>
    )
  }
}

function mapStateToProps(state: RootState): StateProps {
  return {
    filters: state.HomeReducer.pokemonFilter
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, null, AnyAction>): DispatchProps => {
  return {
    getFilterCondition:(condition) => {
      return dispatch(filterCondition({ filter: condition }))
    },
    getPokemonAttr:(page, limit) => {
      return dispatch(getPokemonRank(page, limit))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Template)
