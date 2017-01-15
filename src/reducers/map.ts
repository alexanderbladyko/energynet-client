import {
    IBaseAction,
    IDataAction,
    IErrorAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import * as State from 'state'


export default {
    [actionTypes.MAP_INFO_REQUEST]: function(state: State.IMapState, action: IBaseAction): State.IMapState {
        return {
            ...state,
            loading: true,
        }
    },

    [actionTypes.MAP_INFO_RESPONSE]: function(state: State.IMapState, action: IDataAction<State.IMap>): State.IMapState {
        return {
            ...state,
            data: action.payload.data,
            loading: false,
        }
    },

    [actionTypes.MAP_INFO_ERROR]: function(state: State.IMapState, action: IErrorAction): State.IMapState {
        return {
            ...state,
            loading: false,
            message: action.payload.message,
        }
    },
}
