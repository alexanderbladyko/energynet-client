import {
    IBaseAction,
} from 'actions/base'
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
