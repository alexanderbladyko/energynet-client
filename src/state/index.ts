import * as routes from '../constants/routes'


export interface IConfigState {
    loading: boolean,
    data?: IConfig,
    error: boolean,
    message?: string
}

export interface IConfig {
    authApi: string,
}

export interface IUserInfoState {
    loading: boolean,
    data: IUserInfo,
    error: boolean,
    message?: string,
}

export interface IUserInfo {
    name?: string,
    isAuthenticated: boolean,
}

export interface IRouteState {
    path: string,
}

export interface ISocketState {
    connected: boolean,
}

export interface IState extends Object {
    config: IConfigState,
    route: IRouteState,
    socket: ISocketState,
    userInfo: IUserInfoState,
}

export const initialState: IState = {
    config: {
        error: false,
        loading: false,
    },
    route: {
        path: routes.LOADING_ROUTE,
    },
    socket: {
        connected: false,
    },
    userInfo: {
        data: {
            isAuthenticated: false,
        },
        error: false,
        loading: false,
    },
}
