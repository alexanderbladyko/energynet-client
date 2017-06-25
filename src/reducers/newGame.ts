import {
    IBaseAction,
    IDataAction,
    IErrorAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import * as State from 'state'


export default {
    [actionTypes.GAMES_NEW_REQUEST]: function(state: State.INewGameState, action: IBaseAction): State.INewGameState {
        return {
            ...state,
            loading: true,
            loaded: false,
            error: false,
        }
    },

    [actionTypes.GAMES_NEW_SUCCESS]: function(state: State.INewGameState, action: IDataAction<State.INewGame>): State.INewGameState {
        return {
            ...state,
            loading: false,
            data: action.payload.data,
            opened: false,
            loaded: true,
        }
    },

    [actionTypes.GAMES_NEW_ERROR]: function(state: State.INewGameState, action: IErrorAction): State.INewGameState {
        return {
            ...state,
            loading: false,
            error: true,
            loaded: false,
            message: action.payload.message,
        }
    },

    [actionTypes.GAMES_NEW_TOGGLE]: function(state: State.INewGameState, action: IBaseAction): State.INewGameState {
        return {
            ...state,
            opened: !state.opened,
        }
    },
}
