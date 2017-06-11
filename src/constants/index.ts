export const MIN_PLAYERS: number = 2
export const MAX_PLAYERS: number = 6

export const DEFAULT_PLAYERS_LIMIT: number = 4

export const AUTH_TOKEN_KEY: string = 'token'

export class StepTypes {
    public static AUCTION: string = 'auction'
    public static AUCTION_CHOOSE: string = 'auction_choose'
    public static AREAS: string = 'areas'
    public static CITIES_BUY: string = 'cities_buy'
    public static COLORS: string = 'colors'
    public static RESOURCES_BUY: string = 'resources_buy'
    public static EXCLUDE_STATION: string = 'exclude_station'
}

export class ActionTypes {
    public static AUCTION_BET: string = 'auction_bet'
    public static AUCTION_FOLD: string = 'auction_fold'
    public static RESOURCE_BUY: string = 'resource_buy'
    public static AUCTION_SELECT_STATION: string = 'auction_select'
    public static EXCLUDE_STATION: string = 'exclude_station'
    public static CITIES_BUY: string = 'cities_buy'
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
