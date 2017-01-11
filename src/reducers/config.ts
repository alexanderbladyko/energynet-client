import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import {
    IConfigState,
} from 'state'


export default {
    [actionTypes.CONFIG_REQUEST]: function(state: IConfigState, action: IBaseAction): IConfigState {
        return {
            ...state,
            loading: true,
        }
    },

    [actionTypes.CONFIG_RESPONSE]: function(state: IConfigState, action: IBaseAction): IConfigState {
        return {
            ...state,
            data: action.payload.config,
            loading: false,
        }
    },

    [actionTypes.CONFIG_ERROR]: function(state: IConfigState, action: IBaseAction): IConfigState {
        return {
            ...state,
            loading: false,
            message: action.payload.message,
        }
    },
}
