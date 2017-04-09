import {
    IDataAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import * as State from 'state'


export default {
    [actionTypes.AUCTION_ACTION_SELECT]:
            function(state: State.IAuctionChooseState, action: IDataAction<number>): State.IAuctionChooseState {
        return {
            ...state,
            selectedStationId: action.payload.data,
        }
    },
}
