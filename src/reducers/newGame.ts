import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import {
    INewGameState,
} from 'state'


export default {
    [actionTypes.NEW_GAME_REQUEST]: function(state: INewGameState, action: IBaseAction): INewGameState {
        return {
            ...state,
            loading: true,
        }
    },
    [actionTypes.NEW_GAME_SUCCESS]: function(state: INewGameState, action: IBaseAction): INewGameState {
        return {
            ...state,
            loading: false,
            data: action.payload.data,
            opened: false,
        }
    },
    [actionTypes.NEW_GAME_ERROR]: function(state: INewGameState, action: IBaseAction): INewGameState {
        return {
            ...state,
            loading: false,
            error: true,
            message: action.payload.message,
        }
    },
    [actionTypes.NEW_GAME_TOGGLE]: function(state: INewGameState, action: IBaseAction): INewGameState {
        return {
            ...state,
            opened: !state.opened,
        }
    },
}
