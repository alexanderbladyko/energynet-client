import { combineReducers } from 'redux'

import userInfo from 'reducers/userInfo'
import route from 'reducers/route'
import config from 'reducers/config'


const rootReducer = combineReducers({
    config,
    userInfo,
    route,
})

export default rootReducer
