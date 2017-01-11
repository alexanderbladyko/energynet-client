import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import {
    IStatusState,
} from 'state'


export default {
    [actionTypes.STATE_REQUEST]: function(state: IStatusState, action: IBaseAction): IStatusState {
        return {
            ...state,
            loading: true,
        }
    },

    [actionTypes.STATE_RECEIVE]: function(state: IStatusState, action: IBaseAction): IStatusState {
        return {
            ...state,
            loading: false,
            data: action.payload.data,
        }
    },
}
