import { combineReducers } from 'redux'

import userInfo from 'reducers/userInfo'
import route from 'reducers/route'
import config from 'reducers/config'
import socket from 'reducers/socket'
import games from 'reducers/games'
import lobby from 'reducers/lobby'
import state from 'reducers/state'


const rootReducer = combineReducers({
    config,
    userInfo,
    route,
    socket,
    games,
    lobby,
    state,
})

export default rootReducer
