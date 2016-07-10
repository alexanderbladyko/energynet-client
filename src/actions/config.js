import {
    CONFIG_REQUEST,
    CONFIG_RESPONSE,
    CONFIG_ERROR,
} from 'constants/actionTypes'
import {
    CONFIG_URL,
} from 'constants'
import ajax from 'utils/ajax'


export function requestConfig() {
    return {
        type: CONFIG_REQUEST,
    }
}

export function responseConfig(config) {
    return {
        type: CONFIG_RESPONSE,
        payload: {
            config,
        },
    }
}

export function errorConfig(message) {
    return {
        type: CONFIG_ERROR,
        error: true,
        payload: {
            message,
        },
    }
}

export function loadConfig() {
    return dispatch => {
        dispatch(requestConfig())
        return ajax.get(CONFIG_URL).then(
            config => dispatch(responseConfig(config)),
            error => dispatch(errorConfig(error))
        )
    }
}
