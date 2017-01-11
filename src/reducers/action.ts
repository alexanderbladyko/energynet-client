import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import {
    IGameActionState,
} from 'state'

export default {
    [actionTypes.GAME_ACTION_REQUEST]: function(state: IGameActionState, action: IBaseAction): IGameActionState {
        return {
            ...state,
            loading: true,
            error: false,
            type: action.payload.type,
        }
    },

    [actionTypes.GAME_ACTION_REQUEST]: function(state: IGameActionState, action: IBaseAction): IGameActionState {
        return {
            ...state,
            loading: false,
        }
    },

    [actionTypes.GAME_ACTION_ERROR]: function(state: IGameActionState, action: IBaseAction): IGameActionState {
        return {
            ...state,
            loading: false,
            error: true,
            message: action.payload.message,
        }
    },
}
