import * as Bluebird from 'bluebird'
import { Dispatch, } from 'redux'

import { IBaseAction, } from 'actions/base'
import UserInfoApi from 'api/userInfo'
import * as actionTypes from 'constants/actionTypes'
import { IState, IConfig, IUserInfo, IConfigState, } from 'state'


export function requestUserInfo(): IBaseAction {
    return {
        type: actionTypes.USER_INFO_REQUEST,
    }
}

export function responseUserInfo(userInfo: IUserInfo): IBaseAction {
    return {
        type: actionTypes.USER_INFO_RESPONSE,
        payload: {
            userInfo,
        },
    }
}

export function errorUserInfo(message: string): IBaseAction {
    return {
        type: actionTypes.USER_INFO_ERROR,
        error: true,
        payload: {
            message,
        },
    }
}

export function loadUserInfo(dispatch: Dispatch<IState>, config: IConfigState): Bluebird<IUserInfo|void> {
    dispatch(requestUserInfo())
    const api: UserInfoApi = new UserInfoApi()
    return api.get(config).then(
        userInfo => {
            dispatch(responseUserInfo(userInfo))
            return userInfo
        },
        error => {
            dispatch(errorUserInfo(error))
        }
    )
}

// export function requestLogin() {
//     return {
//         type: USER_LOGIN_REQUEST,
//     }
// }
//
// export function responseLogin(userInfo) {
//     return {
//         type: USER_LOGIN_RESPONSE,
//         payload: {
//             userInfo,
//         },
//     }
// }
//
// export function errorLogin(message) {
//     return {
//         type: USER_LOGIN_ERROR,
//         error: true,
//         payload: {
//             message,
//         },
//     }
// }
//
// export function loginUser(dispatch) {
//     return (data, config) => {
//         dispatch(requestLogin())
//         return ajax.post(`${config.data.authApi}${LOGIN_URL}`, data).then(
//             userInfo => dispatch(responseLogin(userInfo)),
//             error => dispatch(errorLogin(error))
//         )
//     }
// }
//
// export function requestRegister() {
//     return {
//         type: USER_REGISTER_REQUEST,
//     }
// }
//
// export function responseRegister(registerInfo) {
//     return {
//         type: USER_REGISTER_RESPONSE,
//         payload: {
//             registerInfo,
//         },
//     }
// }
//
// export function errorRegister(message) {
//     return {
//         type: USER_REGISTER_ERROR,
//         error: true,
//         payload: {
//             message,
//         },
//     }
// }
//
// export function registerUser(dispatch) {
//     return (data, config) => {
//         dispatch(requestRegister())
//         return ajax.post(`${config.data.authApi}${REGISTER_URL}`, data).then(
//             registerInfo => dispatch(responseRegister(registerInfo)),
//             error => dispatch(errorRegister(error))
//         )
//     }
// }
