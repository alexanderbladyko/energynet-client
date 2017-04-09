import {
    IBaseAction,
    IDataAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'

export interface IAddResource {
    station: State.IMapStation
    resource: string
}


export function addResource(station: State.IMapStation, resource: string): IDataAction<IAddResource> {
    return {
        type: actionTypes.RESOURCES_BUY_ADD_RESOURCE,
        payload: {
            data: {
                station,
                resource,
            },
        },
    }
}

export function clearStation(station: State.IMapStation): IDataAction<State.IMapStation> {
    return {
        type: actionTypes.RESOURCES_BUY_CLEAR_STATION,
        payload: {
            data: station,
        },
    }
}

export function clearAll(): IBaseAction {
    return {
        type: actionTypes.RESOURCES_BUY_CLEAR_ALL,
    }
}
