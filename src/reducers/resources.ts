import {
    IBaseAction,
    IDataAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import * as State from 'state'


export default {
    [actionTypes.RESOURCES_REQUEST]: function(state: State.IResourcesState, action: IBaseAction): State.IResourcesState {
        return {
            ...state,
            loading: true,
            loaded: false,
            error: false,
            selectedStationId: 0,
        }
    },

    [actionTypes.RESOURCES_RECEIVE]: function(state: State.IResourcesState, action: IDataAction<State.IResources>): State.IResourcesState {
        return {
            ...state,
            loading: false,
            loaded: true,
            data: action.payload.data,
        }
    },
}
