import {
    IBaseAction,
    IErrorAction,
    ITypeDataAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export function requestGameAction<T>(type: string, data: T): ITypeDataAction<T> {
    return {
        type: actionTypes.GAME_ACTION_SUCCESS,
        payload: {
            type,
            data,
        },
    }

}


export function receiveGameAction(response: State.IGameActionResponse): IBaseAction|IErrorAction {
    if (response.success) {
        return {
            type: actionTypes.GAME_ACTION_SUCCESS,
        }
    }
    return {
        type: actionTypes.GAME_ACTION_ERROR,
        error: true,
        payload: {
            message: response.reason,
        },
    }
}
