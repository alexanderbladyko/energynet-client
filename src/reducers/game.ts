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
        return {
            ...state,
            loading: true,
        }
    case actionTypes.GAME_INFO_RECEIVE:
        return {
            ...state,
            loading: false,
            meta: action.meta,
            data: action.payload.data,
        }
    default:
        return state || initialState.game
    }
}
