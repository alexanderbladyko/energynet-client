import { Dispatch, } from 'redux'
import * as Bluebird from 'bluebird'

import { IBaseAction, } from './base'
import ConfigApi from '../api/config'
import * as actionTypes from 'constants/actionTypes'
import { IState, IConfig, } from 'state'


export function requestConfig(): IBaseAction {
    return {
        type: actionTypes.CONFIG_REQUEST,
    }
}

export function responseConfig(config: IConfig): IBaseAction {
    return {
        type: actionTypes.CONFIG_RESPONSE,
        payload: {
            config,
        },
    }
}

export function errorConfig(message: string): IBaseAction {
    return {
        type: actionTypes.CONFIG_ERROR,
        error: true,
        payload: {
            message,
        },
    }
}

export function loadConfig(dispatch: Dispatch<IState>): Bluebird<void|IConfig> {
    dispatch(requestConfig())
    const api: ConfigApi = new ConfigApi()
    return api.get().then(
        config => {
            dispatch(responseConfig(config))
            return config
        },
        error => {
            dispatch(errorConfig(error))
        }
    )
}
