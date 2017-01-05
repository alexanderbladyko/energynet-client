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
    gameApi: string
    colors: string[]
}

export interface IUserInfoState extends IBaseState {
    data: IUserInfo
}

export interface IUserInfo {
    id?: number
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
    data: Array<IStartingGame>
    gameJoining: boolean
}

export interface IStartingGame {
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

export interface IStatusState extends IBaseState {
    data?: {
        inGame: boolean
        inLobby: boolean
    }
}

export interface IPlayer {
    id: number
    name: string
}

export interface IPlayersState extends IBaseState {
    data?: IPlayer[]
}

export interface IGamePlayer {
    id: number
    cash: number
    color: string|null
    stations: number[]
    resources: {
        coal: number
        oil: number
        waste: number
        uranus: number
    }
    cities: Array<string|number>
}

export interface IGame extends IBaseState {
    meta?: {
        turn?: number
        phase?: number
        step: string
        areas?: string[]
        auction?: {
            lastBet: number
            station: number
            userId: number
        }
        order?: number[]
    }
    data?: IGamePlayer[]
}

export interface IGameActionState extends IBaseState {
    type: string|null
}

export interface IGameActionResponse extends IActionResponse {}

export interface IGameState extends IBaseState, IGame {
}

export interface IState extends Object {
    action: IGameActionState
    config: IConfigState
    newGame: INewGameState
    game: IGameState
    games: IGamesState
    lobby: ILobbyState
    login: ILoginState
    players: IPlayersState
    register: IRegisterState
    route: IRouteState
    socket: ISocketState
    status: IStatusState
    userInfo: IUserInfoState
}

export const initialState: IState = {
    action: {
        error: false,
        loading: false,
        type: null,
    },
    config: {
        error: false,
        loading: false,
    },
    newGame: {
        error: false,
        loading: false,
        opened: false,
    },
    game: {
        error: false,
        loading: false,
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
    players: {
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
    status: {
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
