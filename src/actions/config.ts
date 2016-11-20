import ConfigApi from 'api/config'

import { IBaseAction } from 'actions/base'

import { IConfig } from 'state'

import * as actionTypes from 'constants/actionTypes'


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

export function loadConfig(dispatch: Dispatch<IState>) {
    dispatch(requestConfig())
    const api = new ConfigApi()
    return ajax.get(CONFIG_URL).then(
        config => {
            dispatch(responseConfig(config))
            return config
        },
        error => {
            dispatch(errorConfig(error))
        }
    )
}