import { IBaseAction, } from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export function requestGames(): IBaseAction {
    return {
        type: actionTypes.GAMES_REQUEST,
    }
}

export function receiveGames(data: Array<State.IGame>): IBaseAction {
    return {
        type: actionTypes.GAMES_RECEIVE,
        payload: {
            data,
        },
    }
}

export function requestGameJoin(): IBaseAction {
    return {
        type: actionTypes.GAMES_JOIN,
    }
}

export function responseGameJoin(response: State.IGameJoin): IBaseAction {
    if (response.success) {
        return {
            type: actionTypes.GAMES_JOIN_SUCCESS,
        }
    }
    return {
        type: actionTypes.GAMES_JOIN_ERROR,
    }
}
