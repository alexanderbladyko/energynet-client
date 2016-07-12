import {
    USER_INFO_REQUEST,
    USER_INFO_RESPONSE,
    USER_INFO_ERROR,
} from 'constants/actionTypes'
import {
    USER_INFO_URL,
} from 'constants'
import ajax from 'utils/ajax'


export function requestUserInfo() {
    return {
        type: USER_INFO_REQUEST,
    }
}

export function responseUserInfo(userInfo) {
    return {
        type: USER_INFO_RESPONSE,
        payload: {
            userInfo,
        },
    }
}

export function errorUserInfo(message) {
    return {
        type: USER_INFO_ERROR,
        error: true,
        payload: {
            message,
        },
    }
}

export function loadUserInfo(dispatch, config) {
    dispatch(requestUserInfo())
    return ajax.get(`${config.gameApi}${USER_INFO_URL}`).then(
        userInfo => {
            dispatch(responseUserInfo(userInfo))
            return userInfo
        },
        error => dispatch(errorUserInfo(error))
    )
}
