import {
    Reducer,
} from 'redux'

import action from 'reducers/action'
import auction from 'reducers/auction'
import config from 'reducers/config'
import game from 'reducers/game'
import games from 'reducers/games'
import lobby from 'reducers/lobby'
import login from 'reducers/login'
import map from 'reducers/map'
import newGame from 'reducers/newGame'
import players from 'reducers/players'
import register from 'reducers/register'
import resources from 'reducers/resources'
import route from 'reducers/route'
import socket from 'reducers/socket'
import status from 'reducers/status'
import userInfo from 'reducers/userInfo'

import {
    initialState,
} from 'state'


function getReducer(reducerFunctions: any, initialState: any): Reducer<any> {
    return (state: any, action: any): any => {
        // if (reducerFunctions.before) {
        //     const beforeResult: any = reducerFunctions.before(state, action)
        //     if (beforeResult) {
        //         return beforeResult
        //     }
        // }
        if (reducerFunctions[action.type] !== undefined) {
            return reducerFunctions[action.type](state, action)
        }
        return state || initialState
    }
}

export default {
    action: getReducer(action, initialState.action),
    auction: getReducer(auction, initialState.auction),
    config: getReducer(config, initialState.config),
    game: getReducer(game, initialState.game),
    games: getReducer(games, initialState.games),
    map: getReducer(map, initialState.map),
    lobby: getReducer(lobby, initialState.lobby),
    login: getReducer(login, initialState.login),
    newGame: getReducer(newGame, initialState.newGame),
    players: getReducer(players, initialState.players),
    register: getReducer(register, initialState.register),
    resources: getReducer(resources, initialState.resources),
    route: getReducer(route, initialState.route),
    socket: getReducer(socket, initialState.socket),
    status: getReducer(status, initialState.status),
    userInfo: getReducer(userInfo, initialState.userInfo),
}
