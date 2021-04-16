import Taro from '@tarojs/taro'
import {RootState} from '../reducers'
import {AnyAction} from 'redux'
import {ThunkDispatch} from 'redux-thunk'
import {createAction} from 'redux-actions'

const BASR_URL = 'http://49.234.106.77:8080'
/**
 * @获取Pokemon
 * */
export function getPokemon(id: number) {
  return async (dispatch: ThunkDispatch<RootState, null, AnyAction>, getState: () => RootState) => {
    try {
      const response = await Taro.request({ url: BASR_URL + `/pokemon/get?id=${id}` })

      dispatch(getPokemonSuccess({
        pokemon: response.data
      }))

      return response.data.card
    } catch (error) {
      console.log('请求错误：', error)
    }
  }
}

export const GET_POKEMON_SUCCESS = "GET_POKEMON_SUCCESS"

export interface getPokemonSuccessPayload {
  pokemon: any
}

const getPokemonSuccess = createAction(
  GET_POKEMON_SUCCESS,
  (payload: getPokemonSuccessPayload) => {
    return payload
  }
)


/**
 * @获取Pokemon列表
 * */
export function getPokemonRank(page, pageSize) {
  return async (dispatch: ThunkDispatch<RootState, null, AnyAction>, getState: () => RootState) => {
    try {
      const id = (page - 1) * pageSize + 1
      const filter = getState().HomeReducer.filter
      const rank = page === 1 ? new Array() : getState().HomeReducer.pokemonRank
      let url = ''
      switch (filter.title) {
        case 'attr':
          url = `/pokemon/get_attr?card_attr=${filter.item}&limit=${pageSize}&page=${page}`
          break;

        case 'type':
          url = `/pokemon/get_type?card_type=${filter.item}&limit=${pageSize}&page=${page}`
          break;

        case 'style':
          url = `/pokemon/get_style?card_style=${filter.item}&limit=${pageSize}&page=${page}`
          break;

        default:
          url = `/pokemon/get_range?id=${id}&limit=${pageSize}`
          break;
      }
      const response = await Taro.request({ url: BASR_URL + url })

      dispatch(getPokemonRankSuccess({
        pokemonRank: rank.concat(response.data.cards)
      }))

      return response
    } catch (error) {
      console.log('请求错误：', error)
    }
  }
}

export const GET_POKEMON_RANK_SUCCESS = "GET_POKEMON_RANK_SUCCESS"

export interface getPokemonRankSuccessPayload {
  pokemonRank: any
}

const getPokemonRankSuccess = createAction(
  GET_POKEMON_RANK_SUCCESS,
  (payload: getPokemonRankSuccessPayload) => {
    return payload
  }
)


/**
 * @获取Pokemon筛选列表
 * */
export function getPokemonFilter() {
  return async (dispatch: ThunkDispatch<RootState, null, AnyAction>, getState: () => RootState) => {
    try {
      const response = await Taro.request({ url: BASR_URL + `/pokemon/get_filter` })

      dispatch(getPokemonFilterSuccess({
        pokemonFilter: response.data
      }))

      return response
    } catch (error) {
      console.log('请求错误：', error)
    }
  }
}

export const GET_POKEMON_FILTER_SUCCESS = "GET_POKEMON_FILTER_SUCCESS"
export interface getPokemonFilterSuccessPayload {
  pokemonFilter: any
}

const getPokemonFilterSuccess = createAction(
  GET_POKEMON_FILTER_SUCCESS,
  (payload: getPokemonFilterSuccessPayload) => {
    return payload
  }
)

// 筛选条件
export const FILTER_CONDITION = "FILTER_CONDITION"
export interface filterConditionPayload {
  filter: any
}

export const filterCondition = createAction(
  FILTER_CONDITION,
  (payload: filterConditionPayload) => {
    return payload
  }
)