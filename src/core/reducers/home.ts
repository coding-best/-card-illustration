import { handleActions, Action, Reducer } from "redux-actions"
import { GET_POKEMON_SUCCESS, GET_POKEMON_RANK_SUCCESS } from "../actions/home"

export interface HomeState {
  pokemon: any
  pokemonRank: any
}

let defaultStatus = {
  pokemonRank: []
}

function getPokemonSuccessHandleAction(state: HomeState, action: Action<any>) {
  return Object.assign({}, state, action.payload)
}

function getPokemonRankSuccessHandleAction(state: HomeState, action: Action<any>) {
  return Object.assign({}, state, action.payload)
}

// Reducer
export const HomeReducer: Reducer<HomeState, any> = handleActions<any>(
  {
    [GET_POKEMON_SUCCESS]: getPokemonSuccessHandleAction,
    [GET_POKEMON_RANK_SUCCESS]: getPokemonRankSuccessHandleAction
  },
  defaultStatus
)
