import { IBaseAction, } from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export function requestState(): IBaseAction {
    return {
        type: actionTypes.STATE_REQUEST,
    }
}

export function receiveState(data: State.IGameState): IBaseAction {
    return {
        type: actionTypes.STATE_RECEIVE,
        payload: {
            data,
        },
    }
}
