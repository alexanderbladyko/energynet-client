import { IBaseAction, } from 'actions/base'
import * as constants from 'constants'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export function requestAuction(): IBaseAction {
    return {
        type: actionTypes.AUCTION_REQUEST,
    }
}

export function receiveAuction(response: State.IAuction): IBaseAction {
    return {
        type: actionTypes.AUCTION_RECEIVE,
        meta: response.meta,
        payload: {
            data: response.data,
        },
    }
}


export function requestAuctionBet(bet: number): IBaseAction {
    return {
        type: actionTypes.GAME_ACTION_REQUEST,
        payload: {
            type: constants.ActionTypes.AUCTION_BET,
            bet,
        },
    }
}

export function requestAuctionFold(): IBaseAction {
    return {
        type: actionTypes.GAME_ACTION_REQUEST,
        payload: {
            type: constants.ActionTypes.AUCTION_FOLD,
        },
    }
}
