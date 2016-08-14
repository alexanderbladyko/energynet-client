import { combineReducers } from 'redux'

import userInfo from 'reducers/userInfo'
import route from 'reducers/route'
import config from 'reducers/config'
import socket from 'reducers/socket'
import games from 'reducers/games'
import lobby from 'reducers/lobby'


const rootReducer = combineReducers({
    config,
    userInfo,
    route,
    socket,
    games,
    lobby,
})

export default rootReducer
