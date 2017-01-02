import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import {
    IStatusState,
    initialState,
} from 'state'


export default function status(state: IStatusState, action: IBaseAction): IStatusState {
    switch (action.type) {
    case actionTypes.STATE_REQUEST:
        return Object.assign({}, state, {
            loading: true,
        })
    case actionTypes.STATE_RECEIVE:
        return Object.assign({}, state, {
            loading: false,
            data: action.payload.data,
        })
    default:
        return state || initialState.status
    }
}
