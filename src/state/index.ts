import * as routes from 'constants/routes'


interface IBaseState {
    loading: boolean
    loaded: boolean
    error: boolean
    message?: string
}

interface IActionResponse {
    success: boolean
    reason?: string
}

export interface IConfigState {
    apiUrl: string
}

export interface IUserInfoState extends IBaseState {
    data: IUserInfo
}

export interface IUserInfo {
    id?: number
    name?: string
    isAuthenticated: boolean
    userToken?: string
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
    playersLimit: number
}

export interface INewGameState extends IBaseState {
    opened: boolean
    data?: INewGame
}

export interface INewGame extends IActionResponse {}

export interface IStartGame extends IActionResponse {}

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

export interface IGamePlayer {
    id: number
    cash: number
    color: string|null
    data: {
        name: string
        avatar: string
    }
    stations: number[]
    resources: {
        coal: number
        oil: number
        waste: number
        uranium: number
    }
    cities: {
        [city: string]: number
    }
}

export interface IGameMeta {
    turn?: number
    phase?: number
    step: string
    areas?: string[]
    auction?: {
        bet: number
        station: number
        userId: number
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

export interface IAuctionState extends IBaseState, IAuction {}

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

export interface IMapJunction {
    [to: string]: number
}

export interface IMapGraph {
    [from: string]: IMapJunction
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
    areas: IArea[]
    cities: ICity[]
    junctions: IJunction[]
    graph: IMapGraph
    colors: string[]
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
    expanded: boolean
}

export interface IResourcesBuyState {
    stations: {
        [stationId: number]: IResources
    }
}

export interface IAuctionChooseState {
    selectedStationId: number|void
}

export interface ICitiesBuyState {
    cities: string[]
}

export interface IState extends Object {
    action: IGameActionState
    auction: IAuctionState
    auctionChoose: IAuctionChooseState
    config: IConfigState
    citiesBuy: ICitiesBuyState
    game: IGameState
    games: IGamesState
    geo: IMapGeoState
    lobby: ILobbyState
    login: ILoginState
    mainPanel: IMainPanelState
    map: IMapState
    newGame: INewGameState
    register: IRegisterState
    resources: IResourcesState
    resourcesBuy: IResourcesBuyState
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
        loaded: false,
        type: null,
    },
    auction: {
        error: false,
        loading: false,
        loaded: false,
    },
    auctionChoose: {
        selectedStationId: undefined,
    },
    config: {
        apiUrl: (<any>window).config.apiUrl,
    },
    citiesBuy: {
        cities: [],
    },
    game: {
        error: false,
        loading: false,
        loaded: false,
    },
    games: {
        error: false,
        loading: false,
        loaded: false,
        data: [],
        gameJoining: false,
    },
    geo: {
        error: false,
        loading: false,
        loaded: false,
    },
    lobby: {
        error: false,
        loading: false,
        loaded: false,
    },
    login: {
        error: false,
        loading: false,
        loaded: false,
    },
    newGame: {
        error: false,
        loading: false,
        loaded: false,
        opened: false,
    },
    mainPanel: {
        selectedTab: MainPanelTabs.Auction,
        locked: false,
        showActionTab: false,
        expanded: true,
    },
    map: {
        error: false,
        loading: false,
        loaded: false,
    },
    register: {
        error: false,
        loading: false,
        loaded: false,
    },
    resources: {
        error: false,
        loading: false,
        loaded: false,
    },
    resourcesBuy: {
        stations: {},
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
        loaded: false,
    },
    userInfo: {
        data: {
            isAuthenticated: false,
        },
        error: false,
        loading: false,
        loaded: false,
    },
    userTabs: {
        selectedUserId: undefined,
        locked: false,
    },
}
