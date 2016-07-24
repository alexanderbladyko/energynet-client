import {
    USER_INFO_REQUEST,
    USER_INFO_RESPONSE,
    USER_INFO_ERROR,
    USER_LOGIN_REQUEST,
    USER_LOGIN_RESPONSE,
    USER_LOGIN_ERROR,
    USER_REGISTER_REQUEST,
    USER_REGISTER_RESPONSE,
    USER_REGISTER_ERROR,
} from 'constants/actionTypes'
import {
    USER_INFO_URL,
    LOGIN_URL,
    REGISTER_URL,
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
        error => {
            dispatch(errorUserInfo(error))
        }
    )
}

export function requestLogin() {
    return {
        type: USER_LOGIN_REQUEST,
    }
}

export function responseLogin(userInfo) {
    return {
        type: USER_LOGIN_RESPONSE,
        payload: {
            userInfo,
        },
    }
}

export function errorLogin(message) {
    return {
        type: USER_LOGIN_ERROR,
        error: true,
        payload: {
            message,
        },
    }
}

export function loginUser(dispatch) {
    return (data, config) => {
        dispatch(requestLogin())
        return ajax.post(`${config.data.authApi}${LOGIN_URL}`, data).then(
            userInfo => dispatch(responseLogin(userInfo)),
            error => dispatch(errorLogin(error))
        )
    }
}

export function requestRegister() {
    return {
        type: USER_REGISTER_REQUEST,
    }
}

export function responseRegister(registerInfo) {
    return {
        type: USER_REGISTER_RESPONSE,
        payload: {
            registerInfo,
        },
    }
}

export function errorRegister(message) {
    return {
        type: USER_REGISTER_ERROR,
        error: true,
        payload: {
            message,
        },
    }
}

export function registerUser(dispatch) {
    return (data, config) => {
        dispatch(requestRegister())
        return ajax.post(`${config.data.authApi}${REGISTER_URL}`, data).then(
            registerInfo => dispatch(responseRegister(registerInfo)),
            error => dispatch(errorRegister(error))
        )
    }
}
