import {
    IBaseAction,
    IDataAction,
} from 'actions/base'
import {
    IAddResource,
} from 'actions/resourcesBuy'
import * as actionTypes from 'constants/actionTypes'

import * as State from 'state'


export default {
    [actionTypes.RESOURCES_BUY_ADD_RESOURCE]:
            function(state: State.IResourcesBuyState, action: IDataAction<IAddResource>): State.IResourcesBuyState {
        let newResources: State.IResources = {
            coal: 0,
            oil: 0,
            waste: 0,
            uranium: 0,
        }
        const resources: State.IResources = state.stations[action.payload.data.station.cost]
        if (resources) {
            newResources = {
                ...resources,
            }
        }
        newResources[action.payload.data.resource] += 1
        return {
            ...state,
            stations: {
                ...state.stations,
                [action.payload.data.station.cost]: newResources,
            },
        }
    },

    [actionTypes.RESOURCES_BUY_CLEAR_STATION]:
            function(state: State.IResourcesBuyState, action: IDataAction<State.IMapStation>): State.IResourcesBuyState {
        return {
            ...state,
            stations: {
                ...state.stations,
                [action.payload.data.cost]: {
                    coal: 0,
                    oil: 0,
                    waste: 0,
                    uranium: 0,
                },
            },
        }
    },

    [actionTypes.RESOURCES_BUY_CLEAR_ALL]:
            function(state: State.IResourcesBuyState, action: IBaseAction): State.IResourcesBuyState {
        return {
            ...state,
            stations: {},
        }
    },
}
