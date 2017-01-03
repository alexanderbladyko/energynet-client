import { IBaseAction, } from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export function requestPlayers(): IBaseAction {
    return {
        type: actionTypes.PLAYERS_REQUEST,
    }
}

export function receivePlayers(data: State.IPlayer[]): IBaseAction {
    return {
        type: actionTypes.PLAYERS_RECEIVE,
        payload: {
            data,
        },
    }
}
