import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import {
    IAuctionState,
} from 'state'


export default {
    [actionTypes.AUCTION_REQUEST]: function(state: IAuctionState, action: IBaseAction): IAuctionState {
        return {
            ...state,
            loading: true,
            selectedStationId: 0,
        }
    },

    [actionTypes.AUCTION_RECEIVE]: function(state: IAuctionState, action: IBaseAction): IAuctionState {
        return {
            ...state,
            loading: false,
            meta: action.meta,
            data: action.payload.data,
            selectedStationId: 0,
        }
    },

    [actionTypes.AUCTION_STATION_SELECT]: function(state: IAuctionState, action: IBaseAction): IAuctionState {
        return {
            ...state,
            selectedStationId: action.payload.station.cost,
        }
    },
}
