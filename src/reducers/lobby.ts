import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import {
    ILobbyState,
} from 'state'


export default {
    [actionTypes.LOBBY_REQUEST]: function(state: ILobbyState, action: IBaseAction): ILobbyState {
        return {
            ...state,
            loading: true,
        }
    },

    [actionTypes.LOBBY_RECEIVE]: function(state: ILobbyState, action: IBaseAction): ILobbyState {
        return {
            ...state,
            loading: false,
            data: action.payload.data,
        }
    },

}
