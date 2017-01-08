import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import {
    IAuctionState,
    initialState,
} from 'state'


export default function auction(state: IAuctionState, action: IBaseAction): IAuctionState {
    switch (action.type) {
    case actionTypes.AUCTION_REQUEST:
        return {
            ...state,
            loading: true,
        }
    case actionTypes.AUCTION_RECEIVE:
        return {
            ...state,
            loading: false,
            meta: action.meta,
            data: action.payload.data,
        }
    default:
        return state || initialState.auction
    }
}
