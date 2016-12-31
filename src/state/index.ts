import * as routes from 'constants/routes'


interface IBaseState {
    loading: boolean
    error: boolean
    message?: string
}

interface IActionResponse {
    success: boolean
    reason?: string
}

export interface IConfigState extends IBaseState {
    data?: IConfig
}

export interface IConfig {
    authApi: string
}

export interface IUserInfoState extends IBaseState {
    data: IUserInfo
}

export interface IUserInfo {
    name?: string
    isAuthenticated: boolean
}

export interface IRouteState {
    path: string
}

export interface ISocketState {
    connected: boolean
}

export interface IGamesState extends IBaseState {
    data: Array<IGame>
    gameJoining: boolean
}

export interface IGame {
    id: number
    name: string
    userLimit: number
}

export interface INewGameState extends IBaseState {
    opened: boolean
    data?: INewGame
}

export interface INewGame extends IActionResponse {}

export interface ILobbyState extends IBaseState {
    data?: ILobby
}

export interface ILobby {
    id: number
    data: {
        name: string
        playersLimit: number
    }
    ownerId: number
    players: Array<ILobbyUser>
    users: Array<ILobbyUser>
}

export interface ILobbyUser {
    id: number
    name: string
}

export interface ILoginState extends IBaseState {
    data?: IUserInfo
}

export interface IRegister extends IActionResponse {
}

export interface IRegisterState extends IBaseState {
    data?: IRegister
}

export interface IGameJoin extends IActionResponse {
}

export interface IGameLeave extends IActionResponse {
}

export interface IGameState extends IBaseState  {
    data?: {
        inGame: boolean
        inLobby: boolean
    }
}

export interface IState extends Object {
    config: IConfigState
    newGame: INewGameState
    games: IGamesState
    lobby: ILobbyState
    login: ILoginState
    register: IRegisterState
    route: IRouteState
    socket: ISocketState
    gameState: IGameState
    userInfo: IUserInfoState
}

export const initialState: IState = {
    config: {
        error: false,
        loading: false,
    },
    newGame: {
        error: false,
        loading: false,
        opened: false,
    },
    games: {
        error: false,
        loading: false,
        data: [],
        gameJoining: false,
    },
    lobby: {
        error: false,
        loading: false,
    },
    login: {
        error: false,
        loading: false,
    },
    register: {
        error: false,
        loading: false,
    },
    route: {
        path: routes.LOADING_ROUTE,
    },
    socket: {
        connected: false,
    },
    gameState: {
        error: false,
        loading: false,
    },
    userInfo: {
        data: {
            isAuthenticated: false,
        },
        error: false,
        loading: false,
    },
}
