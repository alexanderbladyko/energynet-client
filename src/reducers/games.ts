import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import {
    IGamesState,
    initialState,
} from 'state'


export default function games(state: IGamesState, action: IBaseAction): IGamesState {
    switch (action.type) {
    case actionTypes.GAMES_REQUEST:
        return {
            ...state,
            loading: true,
            data: [],
        }
    case actionTypes.GAMES_RECEIVE:
        return {
            ...state,
            loading: false,
            data: action.payload.data,
        }
    case actionTypes.GAMES_JOIN:
        return {
            ...state,
            gameJoining: true,
        }
    case actionTypes.GAMES_JOIN_SUCCESS:
    case actionTypes.GAMES_JOIN_ERROR:
        return {
            ...state,
            gameJoining: false,
        }

    default:
        return state || initialState.games
    }
}
