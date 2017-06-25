import {
    IBaseAction,
    IReceiveAction,
    generateReceiveGameAction,
} from 'actions/base'
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

export function requestGameStart(): IBaseAction {
    return {
        type: actionTypes.GAME_START_REQUEST,
    }
}

export const receiveGameStart: IReceiveAction = generateReceiveGameAction(
    actionTypes.GAME_START_SUCCESS, actionTypes.GAME_START_ERROR
)
