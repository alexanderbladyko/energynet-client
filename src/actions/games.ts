import {
    IBaseAction,
    IDataAction,
    IErrorAction,
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
        type: actionTypes.GAMES_JOIN,
    }
}

export function responseGameJoin(response: State.IGameJoin): IBaseAction|IErrorAction {
    if (response.success) {
        return {
            type: actionTypes.GAMES_JOIN_SUCCESS,
        }
    }
    return {
        type: actionTypes.GAMES_JOIN_ERROR,
        error: true,
        payload: {
            message: response.reason,
        },
    }
}

export function requestGameLeave(): IBaseAction {
    return {
        type: actionTypes.GAMES_LEAVE,
    }
}

export function responseGameLeave(response: State.IGameLeave): IBaseAction|IErrorAction {
    if (response.success) {
        return {
            type: actionTypes.GAMES_LEAVE_SUCCESS,
        }
    }
    return {
        type: actionTypes.GAMES_LEAVE_ERROR,
        error: true,
        payload: {
            message: response.reason,
        },
    }
}

export function requestNewGame(): IBaseAction {
    return {
        type: actionTypes.NEW_GAME_REQUEST,
    }
}

export function responseNewGame(response: State.INewGame): IDataAction<State.INewGame>|IErrorAction {
    if (response.success) {
        return {
            type: actionTypes.NEW_GAME_SUCCESS,
            payload: {
                data: response,
            },
        }
    }
    return {
        type: actionTypes.NEW_GAME_ERROR,
        error: true,
        payload: {
            message: response.reason,
        },
    }
}

export function toggleNewGame(): IBaseAction {
    return {
        type: actionTypes.NEW_GAME_TOGGLE,
    }
}
