import * as routes from 'constants/routes'


interface IBaseState {
    loading: boolean,
    error: boolean,
    message?: string,
}

export interface IConfigState extends IBaseState {
    data?: IConfig,
}

export interface IConfig {
    authApi: string,
}

export interface IUserInfoState extends IBaseState {
    data: IUserInfo,
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

export interface IGamesState extends IBaseState {
    data: Array<IGame>,
}

export interface IGame {
    id: number,
}

export interface ILobbyState extends IBaseState {
    data: ILobby,
}

export interface ILobby {
    name: string,
    playersLimit: number,
    users: Array<ILobbyUser>,
}

export interface ILobbyUser {

}

export interface IState extends Object {
    config: IConfigState,
    games: IGamesState,
    route: IRouteState,
    socket: ISocketState,
    userInfo: IUserInfoState,
}

export const initialState: IState = {
    config: {
        error: false,
        loading: false,
    },
    games: {
        error: false,
        loading: false,
        data: [],
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
