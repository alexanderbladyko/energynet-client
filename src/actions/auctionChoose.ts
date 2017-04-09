import {
    IDataAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'


export function selectStation(stationId: number): IDataAction<number> {
    return {
        type: actionTypes.AUCTION_ACTION_SELECT,
        payload: {
            data: stationId,
        },
    }
}
