import {
    IBaseAction,
    IDataAction,
    IErrorAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import * as State from 'state'


export default {
    [actionTypes.GAMES_REQUEST]: function(state: State.IGamesState, action: IBaseAction): State.IGamesState {
        return {
            ...state,
            loading: true,
            data: [],
        }
    },

    [actionTypes.GAMES_RECEIVE]: function(state: State.IGamesState, action: IDataAction<State.IStartingGame[]>): State.IGamesState {
        return {
            ...state,
            loading: false,
            data: action.payload.data,
        }
    },

    [actionTypes.GAMES_JOIN]: function(state: State.IGamesState, action: IBaseAction): State.IGamesState {
        return {
            ...state,
            gameJoining: true,
        }
    },

    [actionTypes.GAMES_JOIN_SUCCESS]: function(state: State.IGamesState, action: IBaseAction): State.IGamesState {
        return {
            ...state,
            gameJoining: false,
        }
    },

    [actionTypes.GAMES_JOIN_ERROR]: function(state: State.IGamesState, action: IErrorAction): State.IGamesState {
        return {
            ...state,
            gameJoining: false,
        }
    },
}
