import Taro from '@tarojs/taro'
import {RootState} from '../reducers'
import {AnyAction} from 'redux'
import {ThunkDispatch} from 'redux-thunk'
import {createAction} from 'redux-actions'

const BASR_URL = 'http://49.234.106.77:8080'
/**
 * @获取Pokemon
 * */
export function getPokemon() {
  return async (dispatch: ThunkDispatch<RootState, null, AnyAction>, getState: () => RootState) => {
    try {
      const response = await Taro.request({ url: BASR_URL + '/pokemon/get?id=1' })

      dispatch(getPokemonSuccess({
        pokemon: response.data
      }))

      return response
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
      const response = await Taro.request({ url: BASR_URL + `/pokemon/get_range?id=${id}&limit=${pageSize}` })

      dispatch(getPokemonRankSuccess({
        pokemonRank: response.data
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

