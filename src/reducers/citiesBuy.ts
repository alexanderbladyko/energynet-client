import {
    IBaseAction,
    IDataAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'

import * as State from 'state'


export default {
    [actionTypes.CITIES_BUY_ADD_CITY]: function(state: State.ICitiesBuyState, action: IDataAction<string>): State.ICitiesBuyState {
        return {
            ...state,
            cities: [
                ...state.cities,
                action.payload.data,
            ],
        }
    },

    [actionTypes.CITIES_BUY_REMOVE_CITY]: function(state: State.ICitiesBuyState, action: IDataAction<string>): State.ICitiesBuyState {
        return {
            ...state,
            cities: state.cities.filter(c => c !== action.payload.data),
        }
    },

    [actionTypes.CITIES_BUY_CLEAR_ALL]: function(state: State.ICitiesBuyState, action: IBaseAction): State.ICitiesBuyState {
        return {
            ...state,
            cities: [],
        }
    },
}
