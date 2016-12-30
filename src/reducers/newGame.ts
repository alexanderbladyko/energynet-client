import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import {
    INewGameState,
    initialState,
} from 'state'


export default function newGame(state: INewGameState, action: IBaseAction): INewGameState {
    switch (action.type) {
    case actionTypes.NEW_GAME_REQUEST:
        return {
            ...state,
            loading: true,
        }
    case actionTypes.NEW_GAME_SUCCESS:
        return {
            ...state,
            loading: false,
            data: action.payload.data,
            opened: false,
        }
    case actionTypes.NEW_GAME_ERROR:
        return {
            ...state,
            loading: false,
            message: action.payload.message,
        }
    case actionTypes.NEW_GAME_TOGGLE:
        return {
            ...state,
            opened: !state.opened,
        }

    default:
        return state || initialState.newGame
    }
}
