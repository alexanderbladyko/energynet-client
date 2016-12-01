import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import {
    IGameState,
    initialState,
} from 'state'


export default function stateReducer(state: IGameState, action: IBaseAction): IGameState {
    switch (action.type) {
    case actionTypes.STATE_GET:
        return Object.assign(state, {
            loading: true,
        })
    case actionTypes.STATE_RECEIVE:
        return Object.assign(state, {
            loading: false,
            data: action.payload.data,
        })
    default:
        return state || initialState.state
    }
}
