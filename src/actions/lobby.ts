import { IBaseAction, } from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export function requestLobby(): IBaseAction {
    return {
        type: actionTypes.LOBBY_REQUEST,
    }
}

export function receiveLobby(data: State.ILobby): IBaseAction {
    return {
        type: actionTypes.LOBBY_RECEIVE,
        payload: {
            data,
        },
    }
}
