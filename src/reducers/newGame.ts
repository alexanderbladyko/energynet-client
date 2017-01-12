import {
    IBaseAction,
    IDataAction,
    IErrorAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import * as State from 'state'


export default {
    [actionTypes.NEW_GAME_REQUEST]: function(state: State.INewGameState, action: IBaseAction): State.INewGameState {
        return {
            ...state,
            loading: true,
        }
    },

    [actionTypes.NEW_GAME_SUCCESS]: function(state: State.INewGameState, action: IDataAction<State.INewGame>): State.INewGameState {
        return {
            ...state,
            loading: false,
            data: action.payload.data,
            opened: false,
        }
    },

    [actionTypes.NEW_GAME_ERROR]: function(state: State.INewGameState, action: IErrorAction): State.INewGameState {
        return {
            ...state,
            loading: false,
            error: true,
            message: action.payload.message,
        }
    },

    [actionTypes.NEW_GAME_TOGGLE]: function(state: State.INewGameState, action: IBaseAction): State.INewGameState {
        return {
            ...state,
            opened: !state.opened,
        }
    },
}
