import {
    IBaseAction,
} from 'actions/base'
import * as routes from 'constants/routes'
import * as actionTypes from 'constants/actionTypes'
import { IRouteState, initialState, } from 'state'


export default function routeReducer(state: IRouteState, action: IBaseAction): IRouteState {
    if (state && state.path === routes.ERROR_ROUTE) {
        return state
    }

    switch (action.type) {
    case actionTypes.CONFIG_REQUEST:
    case actionTypes.CONFIG_RESPONSE:
        return Object.assign({}, state, {
            path: routes.LOADING_ROUTE,
        })
    case actionTypes.CONFIG_ERROR:
    case actionTypes.GAMES_JOIN_ERROR:
    case actionTypes.GAMES_LEAVE_ERROR:
        return Object.assign({}, state, {
            path: routes.ERROR_ROUTE,
        })
    case actionTypes.USER_INFO_RESPONSE:
    case actionTypes.USER_LOGIN_RESPONSE:
        if (action.payload.userInfo.isAuthenticated) {
            return Object.assign({}, state, {
                path: routes.HOME_ROUTE,
            })
        }
        return Object.assign({}, state, {
            path: routes.LOGIN_ROUTE,
        })
    case actionTypes.NAVIGATE:
        return Object.assign({}, state, {
            path: action.payload.route,
        })
    case actionTypes.GAMES_NEW_SUCCESS:
    case actionTypes.GAMES_JOIN_SUCCESS:
        return Object.assign({}, state, {
            path: routes.LOBBY_ROUTE,
        })
    case actionTypes.GAMES_LEAVE_SUCCESS:
        return Object.assign({}, state, {
            path: routes.HOME_ROUTE,
        })
    case actionTypes.STATE_RECEIVE:
        if (action.payload.data.inLobby) {
            return Object.assign({}, state, {
                path: routes.LOBBY_ROUTE,
            })
        }
        if (action.payload.data.inGame) {
            return Object.assign({}, state, {
                path: routes.GAMES_ROUTE,
            })
        }
        return state
    default:
        return state || initialState.route
    }
}
