import { handleActions, Action, Reducer } from "redux-actions"
import { GET_POKEMON_SUCCESS, GET_POKEMON_RANK_SUCCESS, GET_POKEMON_FILTER_SUCCESS, FILTER_CONDITION } from "../actions/home"

export interface HomeState {
  pokemon: any
  pokemonRank: any
  pokemonFilter: any
  filter: any
}

let defaultStatus = {
  pokemonRank: [],
  pokemonFilter: {},
  filter: { title: '', item: ''}
}

function getPokemonSuccessHandleAction(state: HomeState, action: Action<any>) {
  return Object.assign({}, state, action.payload)
}

function getPokemonRankSuccessHandleAction(state: HomeState, action: Action<any>) {
  return Object.assign({}, state, action.payload)
}

function getPokemonFilterSuccessHandleAction(state: HomeState, action: Action<any>) {
  return Object.assign({}, state, action.payload)
}

function getFilterConditionSuccessHandleAction(state: HomeState, action: Action<any>) {
  return Object.assign({}, state, action.payload)
}

// Reducer
export const HomeReducer: Reducer<HomeState, any> = handleActions<any>(
  {
    [GET_POKEMON_SUCCESS]: getPokemonSuccessHandleAction,
    [GET_POKEMON_RANK_SUCCESS]: getPokemonRankSuccessHandleAction,
    [GET_POKEMON_FILTER_SUCCESS]: getPokemonFilterSuccessHandleAction,
    [FILTER_CONDITION]: getFilterConditionSuccessHandleAction
  },
  defaultStatus
)
