import initialState from 'reducers/initialState'

import {
    ERROR_ROUTE,
    LOGIN_ROUTE,
    LOBBY_ROUTE,
    LOADING_ROUTE,
    GAMES_ROUTE,
    HOME_ROUTE,
} from 'constants/routes'
import {
    CONFIG_RESPONSE,
    CONFIG_ERROR,
    USER_INFO_RESPONSE,
    USER_LOGIN_RESPONSE,
    NAVIGATE,
    GAMES_NEW_SUCCESS,
    GAMES_JOIN_SUCCESS,
    GAMES_JOIN_ERROR,
    STATE_RECEIVE,
} from 'constants/actionTypes'


export default function routeReducer(state = initialState.route, action) {
    if (state === ERROR_ROUTE) return state

    switch (action.type) {
    case CONFIG_RESPONSE:
        return LOADING_ROUTE
    case CONFIG_ERROR:
    case GAMES_JOIN_ERROR:
        return ERROR_ROUTE
    case USER_INFO_RESPONSE:
    case USER_LOGIN_RESPONSE:
        if (action.payload.userInfo.isAuthenticated) {
            return HOME_ROUTE
        }
        return LOGIN_ROUTE
    case NAVIGATE:
        return action.payload.route
    case GAMES_NEW_SUCCESS:
    case GAMES_JOIN_SUCCESS:
        return LOBBY_ROUTE
    case STATE_RECEIVE:
        if (action.payload.data.inGame) {
            if (action.payload.data.inLobby) {
                return LOBBY_ROUTE
            }
            return GAMES_ROUTE
        }
        return state
    default:
        return state
    }
}
