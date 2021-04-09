import { combineReducers } from 'redux'
import { HomeReducer, HomeState} from './home'

export interface RootState {
    HomeReducer: HomeState,
}

export default combineReducers({
    HomeReducer,
})
