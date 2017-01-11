import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import {
    IPlayersState,
} from 'state'


export default {
    [actionTypes.PLAYERS_REQUEST]: function(state: IPlayersState, action: IBaseAction): IPlayersState {
        return {
            ...state,
            loading: true,
        }
    },

    [actionTypes.PLAYERS_RECEIVE]: function(state: IPlayersState, action: IBaseAction): IPlayersState {
        return {
            ...state,
            loading: false,
            data: action.payload.data,
        }
    },
}
