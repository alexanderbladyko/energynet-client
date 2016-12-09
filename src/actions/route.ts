import { IBaseAction, } from 'actions/base'
import * as actionTypes from 'constants/actionTypes'


export function navigate(route: string): IBaseAction {
    return {
        type: actionTypes.NAVIGATE,
        payload: {
            route,
        },
    }
}
