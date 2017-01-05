import { IBaseAction, } from 'actions/base'
import * as constants from 'constants'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export function requestAuctionBet(bet: number): IBaseAction {
    return {
        type: actionTypes.GAME_ACTION_REQUEST,
        payload: {
            type: constants.ACTION_TYPES.AUCTION_BET,
            bet,
        },
    }
}

export function requestAuctionFold(): IBaseAction {
    return {
        type: actionTypes.GAME_ACTION_REQUEST,
        payload: {
            type: constants.ACTION_TYPES.AUCTION_FOLD,
        },
    }
}
