import {
    IBaseAction,
    IDataAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'


export function selectTab(userId: number): IDataAction<number> {
    return {
        type: actionTypes.USER_TABS_SELECT,
        payload: {
            data: userId,
        },
    }
}

export function toggleTab(): IBaseAction {
    return {
        type: actionTypes.USER_TABS_TOGGLE_LOCK,
    }
}
