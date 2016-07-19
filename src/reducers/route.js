import initialState from 'reducers/initialState'

import {
    BASE_ROUTE,
    ERROR_ROUTE,
    LOGIN_ROUTE,
} from 'constants/routes'
import {
    CONFIG_RESPONSE,
    CONFIG_ERROR,
    USER_INFO_RESPONSE,
} from 'constants/actionTypes'


export default function routeReducer(state = initialState.route, action) {
    switch (action.type) {
    case CONFIG_RESPONSE:
        return BASE_ROUTE
    case CONFIG_ERROR:
        return ERROR_ROUTE
    case USER_INFO_RESPONSE:
        if (action.payload.userInfo.isAuthenticated) {
            return BASE_ROUTE
        }
        return LOGIN_ROUTE
    default:
        return state
    }
}
