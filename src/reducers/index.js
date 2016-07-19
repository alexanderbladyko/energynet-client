import { combineReducers } from 'redux'

import userInfo from 'reducers/userInfo'
import route from 'reducers/route'
import config from 'reducers/config'
import socket from 'reducers/socket'

const rootReducer = combineReducers({
    config,
    userInfo,
    route,
    socket,
})

export default rootReducer
