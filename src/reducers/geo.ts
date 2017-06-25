import {
    IBaseAction,
    IDataAction,
    IErrorAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import * as State from 'state'


export default {
    [actionTypes.MAP_GEO_REQUEST]: function(state: State.IMapGeoState, action: IBaseAction): State.IMapGeoState {
        return {
            ...state,
            loading: true,
            loaded: false,
            error: false,
        }
    },

    [actionTypes.MAP_GEO_RESPONSE]: function(state: State.IMapGeoState, action: IDataAction<State.IFeatureCollection>): State.IMapGeoState {
        return {
            ...state,
            data: action.payload.data,
            loading: false,
            loaded: true,
        }
    },

    [actionTypes.MAP_GEO_ERROR]: function(state: State.IMapGeoState, action: IErrorAction): State.IMapGeoState {
        return {
            ...state,
            loading: false,
            loaded: false,
            error: true,
            message: action.payload.message,
        }
    },
}
