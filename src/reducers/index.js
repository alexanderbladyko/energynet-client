import { combineReducers } from 'redux'
import userInfo from './user_info'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    userInfo,
    routing: routerReducer,
})

export default rootReducer
