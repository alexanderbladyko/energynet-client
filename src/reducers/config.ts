import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import {
    IConfigState,
    initialState,
} from 'state'


export default function counter(state: IConfigState, action: IBaseAction): IConfigState {
    switch (action.type) {
    case actionTypes.CONFIG_REQUEST:
        return Object.assign(state, {
            loading: true,
        })
    case actionTypes.CONFIG_RESPONSE:
        return Object.assign(state, {
            data: action.payload.config,
            loading: false,
        })
    case actionTypes.CONFIG_ERROR:
        return Object.assign(state, {
            loading: false,
            message: action.payload.message,
        })
    default:
        return state || initialState.config
    }
}
