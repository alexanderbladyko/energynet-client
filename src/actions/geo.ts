import { Dispatch, } from 'redux'
import * as Bluebird from 'bluebird'

import {
    IBaseAction,
    IDataAction,
    IErrorAction,
} from 'actions/base'
import GeoApi from 'api/geo'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export function requestMapGeo(): IBaseAction {
    return {
        type: actionTypes.MAP_GEO_REQUEST,
    }
}

export function responseMapGeo(data: State.IFeatureCollection): IDataAction<State.IFeatureCollection> {
    return {
        type: actionTypes.MAP_GEO_RESPONSE,
        payload: {
            data,
        },
    }
}

export function errorMapGeo(message: string): IErrorAction {
    return {
        type: actionTypes.MAP_GEO_ERROR,
        error: true,
        payload: {
            message,
        },
    }
}

export interface ILoadMapGeoAction {
    (config: State.IConfigState, game: State.IGameState): Bluebird<State.IFeatureCollection|void>
}

export function loadMapGeo(dispatch: Dispatch<State.IState>): ILoadMapGeoAction {
    return (config, game) => {
        dispatch(requestMapGeo())
        const api: GeoApi = new GeoApi()
        return api.get(config, game).then(
            mapInfo => {
                dispatch(responseMapGeo(mapInfo))
                return mapInfo
            },
            error => {
                dispatch(errorMapGeo(error))
                throw new Error('Failed to load map geo')
            }
        )
    }
}
