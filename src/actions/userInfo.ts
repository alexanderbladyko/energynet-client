import * as Bluebird from 'bluebird'
import { Dispatch, } from 'redux'

import {
    IBaseAction,
    IDataAction,
    IErrorAction,
} from 'actions/base'
import UserInfoApi from 'api/userInfo'
import LoginApi from 'api/login'
import RegisterApi from 'api/register'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export function requestUserInfo(): IBaseAction {
    return {
        type: actionTypes.USER_INFO_REQUEST,
    }
}

export function responseUserInfo(userInfo: State.IUserInfo): IDataAction<State.IUserInfo> {
    return {
        type: actionTypes.USER_INFO_RESPONSE,
        payload: {
            data: userInfo,
        },
    }
}

export function errorUserInfo(message: string): IErrorAction {
    return {
        type: actionTypes.USER_INFO_ERROR,
        error: true,
        payload: {
            message,
        },
    }
}

export interface ILoadUserInfoAction {
    (config: State.IConfig): Bluebird<State.IUserInfo|void>
}

export function loadUserInfo(dispatch: Dispatch<State.IState>): ILoadUserInfoAction {
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

export function responseLogin(userInfo: State.IUserInfo): IDataAction<State.IUserInfo> {
    return {
        type: actionTypes.USER_LOGIN_RESPONSE,
        payload: {
            data: userInfo,
        },
    }
}

export function errorLogin(message: string): IErrorAction {
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
    (config: State.IConfig, data: ILoginData): Bluebird<State.IUserInfo|void>
}

export function loginUser(dispatch: Dispatch<State.IState>): ILoginUserAction {
    return (config, data) => {
        dispatch(requestLogin())
        const api: LoginApi = new LoginApi()
        return api.post<ILoginData>(data, config).then(
            userInfo => {
                dispatch(responseLogin(userInfo))
                return userInfo
            },
            error => {
                dispatch(errorLogin(error.data.reason))
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

export function responseRegister(registerInfo: State.IRegister): IDataAction<State.IRegister> {
    return {
        type: actionTypes.USER_REGISTER_RESPONSE,
        payload: {
            data: registerInfo,
        },
    }
}

export function errorRegister(message: string): IErrorAction {
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
    (config: State.IConfig, data: IRegisterData): Bluebird<State.IRegister|void>
}


export function registerUser(dispatch: Dispatch<State.IState>): IRegisterUserAction {
    return (config, data) => {
        dispatch(requestRegister())
        const api: RegisterApi = new RegisterApi()
        return api.post<IRegisterData>(data, config).then(
            registerInfo => {
                dispatch(responseRegister(registerInfo))
                return registerInfo
            },
            error => {
                dispatch(errorRegister(error.data.reason))
                throw new Error('Failed to register')
            }
        )
    }
}
