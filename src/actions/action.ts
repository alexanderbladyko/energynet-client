import { IBaseAction, } from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export function receiveGameAction(response: State.IGameActionResponse): IBaseAction {
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
