import { Dispatch, } from 'redux'
import * as Bluebird from 'bluebird'

import {
    IBaseAction,
    IDataAction,
    IErrorAction,
} from 'actions/base'
import MapApi from 'api/map'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export function requestMapInfo(): IBaseAction {
    return {
        type: actionTypes.MAP_INFO_REQUEST,
    }
}

export function responseMapInfo(data: State.IMap): IDataAction<State.IMap> {
    return {
        type: actionTypes.MAP_INFO_RESPONSE,
        payload: {
            data,
        },
    }
}

export function errorMapInfo(message: string): IErrorAction {
    return {
        type: actionTypes.MAP_INFO_ERROR,
        error: true,
        payload: {
            message,
        },
    }
}

export interface ILoadMapInfoAction {
    (config: State.IConfigState, game: State.IGameState): Bluebird<State.IMap|void>
}

export function loadMapInfo(dispatch: Dispatch<State.IState>): ILoadMapInfoAction {
    return (config, game) => {
        dispatch(requestMapInfo())
        const api: MapApi = new MapApi()
        return api.get(config, game).then(
            mapInfo => {
                dispatch(responseMapInfo(mapInfo))
                return mapInfo
            },
            error => {
                dispatch(errorMapInfo(error))
                throw new Error('Failed to load map info')
            }
        )
    }
}
