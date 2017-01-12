import {
    IBaseAction,
    IDataAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export function requestPlayers(): IBaseAction {
    return {
        type: actionTypes.PLAYERS_REQUEST,
    }
}

export function receivePlayers(data: State.IPlayer[]): IDataAction<State.IPlayer[]> {
    return {
        type: actionTypes.PLAYERS_RECEIVE,
        payload: {
            data,
        },
    }
}
