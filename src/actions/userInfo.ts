import * as Bluebird from 'bluebird'
import { Dispatch, } from 'redux'

import { IBaseAction, } from 'actions/base'
import UserInfoApi from 'api/userInfo'
import LoginApi from 'api/login'
import RegisterApi from 'api/register'
import * as actionTypes from 'constants/actionTypes'
import { IState, IUserInfo, IRegister, IConfig, } from 'state'


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

export interface ILoadUserInfoAction {
    (config: IConfig): Bluebird<IUserInfo|void>
}

export function loadUserInfo(dispatch: Dispatch<IState>): ILoadUserInfoAction {
    return (config) => {
        dispatch(requestUserInfo())
        const api: UserInfoApi = new UserInfoApi()
        return api.get(config).then(
            userInfo => {
                dispatch(responseUserInfo(userInfo))
                return userInfo
            },
            error => {
                dispatch(errorUserInfo(error))
                throw new Error('Failed to load user info')
            }
        )
    }
}

export function requestLogin(): IBaseAction {
    return {
        type: actionTypes.USER_LOGIN_REQUEST,
    }
}

export function responseLogin(userInfo: IUserInfo): IBaseAction {
    return {
        type: actionTypes.USER_LOGIN_RESPONSE,
        payload: {
            userInfo,
        },
    }
}

export function errorLogin(message: string): IBaseAction {
    return {
        type: actionTypes.USER_LOGIN_ERROR,
        error: true,
        payload: {
            message,
        },
    }
}

interface ILoginData {
    username: string
    password: string
}

export interface ILoginUserAction {
    (config: IConfig, data: ILoginData): Bluebird<IUserInfo|void>
}

export function loginUser(dispatch: Dispatch<IState>): ILoginUserAction {
    return (config, data) => {
        dispatch(requestLogin())
        const api: LoginApi = new LoginApi()
        return api.post<ILoginData>(data, config).then(
            userInfo => {
                dispatch(responseLogin(userInfo))
                return userInfo
            },
            error => {
                dispatch(errorLogin(error))
                throw new Error('Failed to login')
            }
        )
    }
}

export function requestRegister(): IBaseAction {
    return {
        type: actionTypes.USER_REGISTER_REQUEST,
    }
}

export function responseRegister(registerInfo: IRegister): IBaseAction {
    return {
        type: actionTypes.USER_REGISTER_RESPONSE,
        payload: {
            registerInfo,
        },
    }
}

export function errorRegister(message: string): IBaseAction {
    return {
        type: actionTypes.USER_REGISTER_ERROR,
        error: true,
        payload: {
            message,
        },
    }
}

interface IRegisterData {
    username: string,
    password: string,
}

export interface IRegisterUserAction {
    (config: IConfig, data: IRegisterData): Bluebird<IRegister|void>
}


export function registerUser(dispatch: Dispatch<IState>): IRegisterUserAction {
    return (config, data) => {
        dispatch(requestRegister())
        const api: RegisterApi = new RegisterApi()
        return api.post<IRegisterData>(data, config).then(
            userInfo => {
                dispatch(responseRegister(userInfo))
                return userInfo
            },
            error => {
                dispatch(errorRegister(error))
                throw new Error('Failed to register')
            }
        )
    }
}
