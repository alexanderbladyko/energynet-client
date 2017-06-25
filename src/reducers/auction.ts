import {
    IBaseAction,
} from 'actions/base'
import {
    IAuctionDataAction,
} from 'actions/auction'
import * as actionTypes from 'constants/actionTypes'

import * as State from 'state'


export default {
    [actionTypes.AUCTION_REQUEST]: function(state: State.IAuctionState, action: IBaseAction): State.IAuctionState {
        return {
            ...state,
            loading: true,
            loaded: false,
            error: false,
        }
    },

    [actionTypes.AUCTION_RECEIVE]: function(state: State.IAuctionState, action: IAuctionDataAction): State.IAuctionState {
        return {
            ...state,
            loading: false,
            loaded: true,
            meta: action.meta,
            data: action.payload.data,
        }
    },

}
