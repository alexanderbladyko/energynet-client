import {
    IBaseAction,
    IDataAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import * as State from 'state'


export default {
    [actionTypes.STATE_REQUEST]: function(state: State.IStatusState, action: IBaseAction): State.IStatusState {
        return {
            ...state,
            loading: true,
            loaded: false,
            error: false,
        }
    },

    [actionTypes.STATE_RECEIVE]: function(state: State.IStatusState, action: IDataAction<State.IGameStatus>): State.IStatusState {
        return {
            ...state,
            loading: false,
            loaded: true,
            error: false,
            data: action.payload.data,
        }
    },
}
