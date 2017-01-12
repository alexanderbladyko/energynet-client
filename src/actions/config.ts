import { Dispatch, } from 'redux'
import * as Bluebird from 'bluebird'

import {
    IBaseAction,
    IDataAction,
    IErrorAction,
} from 'actions/base'
import ConfigApi from 'api/config'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export function requestConfig(): IBaseAction {
    return {
        type: actionTypes.CONFIG_REQUEST,
    }
}

export function responseConfig(config: State.IConfig): IDataAction<State.IConfig> {
    return {
        type: actionTypes.CONFIG_RESPONSE,
        payload: {
            data: config,
        },
    }
}

export function errorConfig(message: string): IErrorAction {
    return {
        type: actionTypes.CONFIG_ERROR,
        error: true,
        payload: {
            message,
        },
    }
}

export interface ILoadConfigAction {
    (): Bluebird<void|State.IConfig>
}

export function loadConfig(dispatch: Dispatch<State.IState>): ILoadConfigAction {
    return function(): Bluebird<void|State.IConfig> {
        dispatch(requestConfig())
        const api: ConfigApi = new ConfigApi()
        return api.get().then(
            config => {
                dispatch(responseConfig(config))
                return config
            },
            error => {
                dispatch(errorConfig(error))
                throw new Error('Failed to load config')
            }
        )
    }
}
