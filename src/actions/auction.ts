import {
    IBaseAction,
    IDataAction,
    ITypeAction,
} from 'actions/base'
import * as constants from 'constants'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export function requestAuction(): IBaseAction {
    return {
        type: actionTypes.AUCTION_REQUEST,
    }
}

export interface IAuctionDataAction extends IBaseAction {
    meta: State.IAuctionMeta
    payload: {
        data: State.IAuctionStation[]
    }
}

export function receiveAuction(response: State.IAuction): IAuctionDataAction {
    return {
        type: actionTypes.AUCTION_RECEIVE,
        meta: response.meta,
        payload: {
            data: response.data,
        },
    }
}

export interface IAuctionBetAction extends ITypeAction {
    payload: {
        type: string
        bet: number
    }
}

export function requestAuctionBet(bet: number): IAuctionBetAction {
    return {
        type: actionTypes.GAME_ACTION_REQUEST,
        payload: {
            type: constants.ActionTypes.AUCTION_BET,
            bet,
        },
    }
}

export function requestAuctionFold(): ITypeAction {
    return {
        type: actionTypes.GAME_ACTION_REQUEST,
        payload: {
            type: constants.ActionTypes.AUCTION_FOLD,
        },
    }
}

export function selectStation(station: State.IAuctionStation): IDataAction<State.IAuctionStation> {
    return {
        type: actionTypes.AUCTION_STATION_SELECT,
        payload: {
            data: station,
        },
    }
}
