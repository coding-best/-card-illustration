import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'

const middlewares: any = [
    thunkMiddleware
]

if (process.env.NODE_ENV === `development`) {
    const logger = createLogger()

    middlewares.push(logger)
}

export default function configStore () {
    const store = createStore(rootReducer, applyMiddleware(...middlewares))
    return store
}
