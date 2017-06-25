import {
    IBaseAction,
    IDataAction,
    IReceiveAction,
    generateReceiveGameAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export function requestGames(): IBaseAction {
    return {
        type: actionTypes.GAMES_REQUEST,
    }
}

export function receiveGames(data: State.IGame[]): IDataAction<State.IGame[]> {
    return {
        type: actionTypes.GAMES_RECEIVE,
        payload: {
            data,
        },
    }
}


export function requestGameJoin(): IBaseAction {
    return {
        type: actionTypes.GAMES_JOIN_REQUEST,
    }
}

export const responseGameJoin: IReceiveAction = generateReceiveGameAction(
    actionTypes.GAMES_JOIN_SUCCESS, actionTypes.GAMES_JOIN_ERROR
)


export function requestGameLeave(): IBaseAction {
    return {
        type: actionTypes.GAMES_LEAVE_REQUEST,
    }
}

export const responseGameLeave: IReceiveAction = generateReceiveGameAction(
    actionTypes.GAMES_LEAVE_SUCCESS, actionTypes.GAMES_LEAVE_ERROR
)

export function requestNewGame(): IBaseAction {
    return {
        type: actionTypes.GAMES_NEW_REQUEST,
    }
}

export const responseNewGame: IReceiveAction = generateReceiveGameAction(
    actionTypes.GAMES_NEW_SUCCESS, actionTypes.GAMES_NEW_ERROR
)

export function toggleNewGame(): IBaseAction {
    return {
        type: actionTypes.GAMES_NEW_TOGGLE,
    }
}
