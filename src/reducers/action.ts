import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import {
    IGameActionState,
    initialState,
} from 'state'


export default function action(state: IGameActionState, action: IBaseAction): IGameActionState {
    switch (action.type) {
    case actionTypes.GAME_ACTION_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
            type: action.payload.type,
        }
    case actionTypes.GAME_ACTION_SUCCESS:
        return {
            ...state,
            loading: false,
        }
    case actionTypes.GAME_ACTION_ERROR:
        return {
            ...state,
            loading: false,
            error: true,
            message: action.payload.message,
        }
    default:
        return state || initialState.action
    }
}
