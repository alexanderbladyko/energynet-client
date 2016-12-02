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
    case actionTypes.GAMES_RECEIVE:
        return Object.assign({}, state, {
            loading: false,
            data: action.payload.data,
        })
    case actionTypes.GAMES_JOIN:
        return Object.assign({}, state, {
            loading: true,
            data: action.payload.data,
        })
    default:
        return state || initialState.games
    }
}
