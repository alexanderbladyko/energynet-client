import initialState from 'reducers/initialState'

import {
    BASE_ROUTE,
    ERROR_ROUTE,
} from 'constants/routes'
import {
    CONFIG_RESPONSE,
    CONFIG_ERROR,
} from 'constants/actionTypes'


export default function routeReducer(state = initialState.route, action) {
    switch (action.type) {
    case CONFIG_RESPONSE:
        return BASE_ROUTE
    case CONFIG_ERROR:
        return ERROR_ROUTE
    default:
        return state
    }
}
