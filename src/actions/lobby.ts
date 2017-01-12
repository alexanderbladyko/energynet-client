import {
    IBaseAction,
    IDataAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export function requestLobby(): IBaseAction {
    return {
        type: actionTypes.LOBBY_REQUEST,
    }
}

export function receiveLobby(data: State.ILobby): IDataAction<State.ILobby> {
    return {
        type: actionTypes.LOBBY_RECEIVE,
        payload: {
            data,
        },
    }
}

export function addUser(id: number): IDataAction<number> {
    return {
        type: actionTypes.LOBBY_ADD_USER,
        payload: {
            data: id,
        },
    }
}

export function removeUser(id: number): IDataAction<number> {
    return {
        type: actionTypes.LOBBY_REMOVE_USER,
        payload: {
            data: id,
        },
    }
}
