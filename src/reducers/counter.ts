import { IBaseAction } from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import { ICounterState } from 'state'


export default function counter(state: ICounterState, action: IBaseAction): ICounterState {
    switch (action.type) {
        case actionTypes.CHANGE_COUNTER:
            return {
                value: state.value + action.payload.delta,
            }
        default:
            return state || {value: 0}
    }
}
