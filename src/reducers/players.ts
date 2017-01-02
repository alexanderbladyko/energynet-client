import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import {
    IPlayersState,
    initialState,
} from 'state'


export default function players(state: IPlayersState, action: IBaseAction): IPlayersState {
    switch (action.type) {
    case actionTypes.PLAYERS_REQUEST:
        return Object.assign({}, state, {
            loading: true,
        })
    case actionTypes.PLAYERS_RECEIVE:
        return Object.assign({}, state, {
            loading: false,
            data: action.payload.data,
        })
    default:
        return state || initialState.players
    }
}
