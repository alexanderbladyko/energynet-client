import {
    IBaseAction,
    IDataAction,
    IErrorAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import * as State from 'state'


export default {
    [actionTypes.CONFIG_REQUEST]: function(state: State.IConfigState, action: IBaseAction): State.IConfigState {
        return {
            ...state,
            loading: true,
            loaded: false,
            error: false,
        }
    },

    [actionTypes.CONFIG_RESPONSE]: function(state: State.IConfigState, action: IDataAction<State.IConfig>): State.IConfigState {
        return {
            ...state,
            data: action.payload.data,
            loading: false,
            loaded: true,
        }
    },

    [actionTypes.CONFIG_ERROR]: function(state: State.IConfigState, action: IErrorAction): State.IConfigState {
        return {
            ...state,
            loading: false,
            message: action.payload.message,
            loaded: false,
            error: true,
        }
    },
}
