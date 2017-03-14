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
    data: IStartingGame[]
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

export interface IGameStatus {
    inGame: boolean
    inLobby: boolean
}

export interface IStatusState extends IBaseState {
    data?: IGameStatus
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
        uranium: number
    }
    cities: Array<string|number>
}

export interface IGameMeta {
    turn?: number
    phase?: number
    step: string
    areas?: string[]
    auction?: {
        bet: number
        station: number
        user: number
    }
    map: string
}

export interface IGame extends IBaseState {
    meta?: IGameMeta
    data?: IGamePlayer[]
}

export interface IGameState extends IBaseState, IGame {}

export interface IGameActionState extends IBaseState {
    type: string|null
}

export interface IGameActionResponse extends IActionResponse {}

export interface IAuctionStation {
    cost: number
    available: boolean
}

export interface IAuctionMeta {
    left: number
}

export interface IAuction {
    meta?: IAuctionMeta
    data?: IAuctionStation[]
}

export interface IAuctionState extends IBaseState, IAuction {
    selectedStationId: number
}

export interface IResources {
    [name: string]: number
    coal: number
    oil: number
    waste: number
    uranium: number
}

export interface IResourcesState extends IBaseState {
    data?: IResources
}

export interface IArea {
    name: string
    color: string
}

export interface ICity {
    name: string
    slots: number[]
    area: string
}

export interface IJunction {
    cost: number
    between: string[]
}

export interface IResourceLimits {
    [name: string]: number
    coal: number
    oil: number
    waste: number
    uranium: number
}

export interface IRefill {
    [name: string]: number[]
    coal: number[]
    oil: number[]
    waste: number[]
    uranium: number[]
}

export interface IMapStation {
    cost: number
    capacity: number
    efficiency: number
    resources: string[]
}

export interface IMap {
    areasCount: number[]
    refill: IRefill[]
    stations: IMapStation[]
    endGameCitiesCount: number[]
    secondPhaseCitiesCount: number[]
    userStationsCount: number[]
    payment: number[]
    resourceLimits: IResourceLimits
    resourceGroup: IResourceLimits
}

export interface IMapState extends IBaseState {
    data?: IMap
}

export interface ICityProps {
    id: string
    area: string
    slots: number[]
}

export interface IAreaProps {
    id: string
    color: string
}

export interface IJunctionProps {
    between: string[]
    cost: number
}

export interface IFeature {
    type: string
    properties: any
    geometry: {
        type: string
        coordinates: any
    }
}

export interface IFeatureCollection extends GeoJSON.FeatureCollection<GeoJSON.GeometryObject> {
    properties?: {
        maxZoom?: number
        minZoom?: number
    }
}

export interface IMapGeoState extends IBaseState {
    data?: IFeatureCollection
}

export interface IUserTabsState {
    selectedUserId: number
    locked: boolean
}

export enum MainPanelTabs {
    Auction,
    Resources,
    Action,
}

export interface IMainPanelState {
    selectedTab: MainPanelTabs
    locked: boolean
    showActionTab: boolean
}

export interface IState extends Object {
    action: IGameActionState
    auction: IAuctionState
    config: IConfigState
    game: IGameState
    games: IGamesState
    geo: IMapGeoState
    lobby: ILobbyState
    login: ILoginState
    mainPanel: IMainPanelState
    map: IMapState
    newGame: INewGameState
    players: IPlayersState
    register: IRegisterState
    resources: IResourcesState
    route: IRouteState
    socket: ISocketState
    status: IStatusState
    userInfo: IUserInfoState
    userTabs: IUserTabsState
}

export const initialState: IState = {
    action: {
        error: false,
        loading: false,
        type: null,
    },
    auction: {
        error: false,
        loading: false,
        selectedStationId: 0,
    },
    config: {
        error: false,
        loading: false,
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
    geo: {
        error: false,
        loading: false,
    },
    lobby: {
        error: false,
        loading: false,
    },
    login: {
        error: false,
        loading: false,
    },
    newGame: {
        error: false,
        loading: false,
        opened: false,
    },
    mainPanel: {
        selectedTab: MainPanelTabs.Auction,
        locked: false,
        showActionTab: false,
    },
    map: {
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
    resources: {
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
    userTabs: {
        selectedUserId: undefined,
        locked: false,
    },
}
