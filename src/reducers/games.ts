import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import {
    IGamesState,
} from 'state'


export default {
    [actionTypes.GAMES_REQUEST]: function(state: IGamesState, action: IBaseAction): IGamesState {
        return {
            ...state,
            loading: true,
            data: [],
        }
    },

    [actionTypes.GAMES_RECEIVE]: function(state: IGamesState, action: IBaseAction): IGamesState {
        return {
            ...state,
            loading: false,
            data: action.payload.data,
        }
    },

    [actionTypes.GAMES_JOIN]: function(state: IGamesState, action: IBaseAction): IGamesState {
        return {
            ...state,
            gameJoining: true,
        }
    },

    [actionTypes.GAMES_JOIN_SUCCESS]: function(state: IGamesState, action: IBaseAction): IGamesState {
        return {
            ...state,
            gameJoining: false,
        }
    },

    [actionTypes.GAMES_JOIN_ERROR]: function(state: IGamesState, action: IBaseAction): IGamesState {
        return {
            ...state,
            gameJoining: false,
        }
    },
}
