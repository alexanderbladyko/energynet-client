import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import {
    ILobbyState,
    initialState,
} from 'state'


export default function lobbyReducer(state: ILobbyState, action: IBaseAction): ILobbyState {
    switch (action.type) {
    case actionTypes.LOBBY_REQUEST:
        return Object.assign({}, state, {
            loading: true,
        })
    case actionTypes.LOBBY_RECEIVE:
        return Object.assign({}, state, {
            loading: false,
            data: action.payload.data,
        })
    default:
        return state || initialState.lobby
    }
}
