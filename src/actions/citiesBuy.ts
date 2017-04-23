import {
    IBaseAction,
    IDataAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'


export function addCity(city: string): IDataAction<string> {
    return {
        type: actionTypes.CITIES_BUY_ADD_CITY,
        payload: {
            data: city,
        },
    }
}


export function removeCity(city: string): IDataAction<string> {
    return {
        type: actionTypes.CITIES_BUY_REMOVE_CITY,
        payload: {
            data: city,
        },
    }
}


export function clearAll(): IBaseAction {
    return {
        type: actionTypes.CITIES_BUY_CLEAR_ALL,
    }
}
