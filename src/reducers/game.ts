import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import {
    IGameState,
    initialState,
} from 'state'


export default function game(state: IGameState, action: IBaseAction): IGameState {
    switch (action.type) {
    case actionTypes.GAME_INFO_REQUEST:
        return Object.assign({}, state, {
            loading: true,
        })
    case actionTypes.GAME_INFO_RECEIVE:
        return Object.assign({}, state, {
            loading: false,
            data: action.payload.data,
        })
    default:
        return state || initialState.game
    }
}
