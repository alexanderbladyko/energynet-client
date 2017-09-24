export const MIN_PLAYERS: number = 2
export const MAX_PLAYERS: number = 6

export const DEFAULT_PLAYERS_LIMIT: number = 4

export const AUTH_TOKEN_KEY: string = 'token'

export class StepTypes {
    public static AUCTION: string = 'auction'
    public static AREAS: string = 'areas'
    public static CITIES_BUY: string = 'cities_buy'
    public static COLORS: string = 'colors'
    public static RESOURCES_BUY: string = 'resources_buy'
    public static EXCLUDE_STATION: string = 'remove_station'
}

export class ActionTypes {
    public static AUCTION_BID: string = 'auction_bid'
    public static AUCTION_PASS: string = 'auction_pass'
    public static RESOURCE_BUY: string = 'resource_buy'
    public static AUCTION_SELECT_STATION: string = 'auction_select'
    public static EXCLUDE_STATION: string = 'remove_station'
    public static CITIES_BUY: string = 'cities_buy'
}

export class Messages {
    public static STATE: string = 'state'

    public static COLOR_CHOOSE: string = 'color_choose'
    public static AUCTION_BID: string = 'auction_bid'
    public static AUCTION_PASS: string = 'auction_pass'
    public static RESOURCE_BUY: string = 'resource_buy'
    public static STATION_REMOVE: string = 'station_remove'
    public static CITIES_BUY: string = 'cities_buy'

    public static GAMES: string = 'games_list'
    public static GAMES_NEW: string = 'games_new'
    public static JOIN_GAME: string = 'game_join'
    public static LEAVE_GAME: string = 'game_leave'
    public static LOBBY: string = 'game_lobby'

    public static START_GAME: string = 'game_start'
    public static GAME: string = 'game'
    public static RESOURCES: string = 'resources'
    public static AUCTION: string = 'auction'
}

export class ResourceTypes {
    public static COAL: string = 'coal'
    public static OIL: string = 'oil'
    public static WASTE: string = 'waste'
    public static URANIUM: string = 'uranium'

    public static ALL: string[] = [
        ResourceTypes.COAL,
        ResourceTypes.OIL,
        ResourceTypes.WASTE,
        ResourceTypes.URANIUM,
    ]
}

export enum GeometryTypes {
    MARKER,
    LINE,
    POLYGON,
}

export class FeatureTypes {
    public static CITY: string = 'CITY'
    public static JUNCTION: string = 'JUNCTION'
    public static AREA: string = 'AREA'
}
