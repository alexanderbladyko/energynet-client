import {
    IBaseAction,
    IDataAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import * as State from 'state'


export default {
    [actionTypes.PLAYERS_REQUEST]: function(state: State.IPlayersState, action: IBaseAction): State.IPlayersState {
        return {
            ...state,
            loading: true,
        }
    },

    [actionTypes.PLAYERS_RECEIVE]: function(state: State.IPlayersState, action: IDataAction<State.IPlayer[]>): State.IPlayersState {
        return {
            ...state,
            loading: false,
            data: action.payload.data,
        }
    },
}
