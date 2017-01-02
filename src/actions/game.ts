import { IBaseAction, } from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export function requestGameInfo(): IBaseAction {
    return {
        type: actionTypes.GAME_INFO_REQUEST,
    }
}

export function receiveState(data: State.IGame): IBaseAction {
    return {
        type: actionTypes.GAME_INFO_RECEIVE,
        payload: {
            data,
        },
    }
}
