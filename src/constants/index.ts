export const MIN_PLAYERS: number = 2
export const MAX_PLAYERS: number = 6

export const DEFAULT_PLAYERS_LIMIT: number = 4

export class StepTypes {
    public static AUCTION: string = 'auction'
    public static AREAS: string = 'areas'
    public static BUILDING: string = 'building'
    public static COLORS: string = 'colors'
    public static RESOURCES: string = 'resources'
}

export class ActionTypes {
    public static AUCTION_BET: string = 'auction_bet'
    public static AUCTION_FOLD: string = 'auction_fold'
}

export class ResourceTypes {
    public static COAL: string = 'coal'
    public static OIL: string = 'oil'
    public static WASTE: string = 'waste'
    public static URANUS: string = 'uranus'
}
