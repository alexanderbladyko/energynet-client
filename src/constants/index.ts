export const MIN_PLAYERS: number = 2
export const MAX_PLAYERS: number = 6

export const DEFAULT_PLAYERS_LIMIT: number = 4

export class STEP_TYPES {
    public static AUCTION: string = 'auction'
    public static AREAS: string = 'areas'
    public static BUILDING: string = 'building'
    public static COLORS: string = 'colors'
    public static RESOURCES: string = 'resources'
}

export class ACTION_TYPES {
    public static AUCTION_BET: string = 'auction_bet'
    public static AUCTION_FOLD: string = 'auction_fold'
}
