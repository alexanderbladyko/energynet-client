import { IBaseAction, } from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export function requestGameInfo(): IBaseAction {
    return {
        type: actionTypes.GAME_INFO_REQUEST,
    }
}

export interface IGameAction extends IBaseAction {
    meta: State.IGameMeta
    payload: {
        data: State.IGamePlayer[]
    }
}

export function receiveGameInfo(response: State.IGame): IGameAction {
    return {
        type: actionTypes.GAME_INFO_RECEIVE,
        meta: response.meta,
        payload: {
            data: response.data,
        },
    }
}
