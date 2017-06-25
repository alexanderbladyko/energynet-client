import {
    IBaseAction,
} from 'actions/base'
import {
    IGameAction,
} from 'actions/game'
import * as actionTypes from 'constants/actionTypes'

import * as State from 'state'


export default {
    [actionTypes.GAME_INFO_REQUEST]: function(state: State.IGameState, action: IBaseAction): State.IGameState {
        return {
            ...state,
            loading: true,
            loaded: false,
        }
    },

    [actionTypes.GAME_INFO_RECEIVE]: function(state: State.IGameState, action: IGameAction): State.IGameState {
        return {
            ...state,
            loading: false,
            loaded: true,
            meta: action.meta,
            data: action.payload.data,
        }
    },
}
