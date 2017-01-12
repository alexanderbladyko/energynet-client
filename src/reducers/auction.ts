import {
    IBaseAction,
    IDataAction,
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
            selectedStationId: 0,
        }
    },

    [actionTypes.AUCTION_RECEIVE]: function(state: State.IAuctionState, action: IAuctionDataAction): State.IAuctionState {
        return {
            ...state,
            loading: false,
            meta: action.meta,
            data: action.payload.data,
            selectedStationId: 0,
        }
    },

    [actionTypes.AUCTION_STATION_SELECT]:
        function(state: State.IAuctionState, action: IDataAction<State.IAuctionStation>): State.IAuctionState {
            return {
                ...state,
                selectedStationId: action.payload.data.cost,
            }
        },
}
