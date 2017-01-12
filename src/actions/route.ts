import { IBaseAction, } from 'actions/base'
import * as actionTypes from 'constants/actionTypes'


export interface IRouteAction extends IBaseAction {
    payload: {
        route: string
    }
}

export function navigate(route: string): IRouteAction {
    return {
        type: actionTypes.NAVIGATE,
        payload: {
            route,
        },
    }
}
