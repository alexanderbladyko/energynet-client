import {
    IBaseAction,
    IDataAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import * as State from 'state'


export default {
    [actionTypes.LOBBY_REQUEST]: function(state: State.ILobbyState, action: IBaseAction): State.ILobbyState {
        return {
            ...state,
            loading: true,
        }
    },

    [actionTypes.LOBBY_RECEIVE]: function(state: State.ILobbyState, action: IDataAction<State.ILobby>): State.ILobbyState {
        return {
            ...state,
            loading: false,
            data: action.payload.data,
        }
    },

}
