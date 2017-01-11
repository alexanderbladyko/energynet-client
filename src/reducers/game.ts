import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import {
    IGameState,
} from 'state'


export default {
    [actionTypes.GAME_INFO_REQUEST]: function(state: IGameState, action: IBaseAction): IGameState {
        return {
            ...state,
            loading: true,
        }
    },

    [actionTypes.GAME_INFO_RECEIVE]: function(state: IGameState, action: IBaseAction): IGameState {
        return {
            ...state,
            loading: false,
            meta: action.meta,
            data: action.payload.data,
        }
    },
}
