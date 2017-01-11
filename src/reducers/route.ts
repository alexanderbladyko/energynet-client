import {
    IBaseAction,
} from 'actions/base'
import * as routes from 'constants/routes'
import * as actionTypes from 'constants/actionTypes'
import { IRouteState, } from 'state'


export default {
    before: function(state: IRouteState, action: IBaseAction): IRouteState {
        if (state && state.path === routes.ERROR_ROUTE) {
            return state
        }
    },

    [actionTypes.CONFIG_REQUEST]: function(state: IRouteState, action: IBaseAction): IRouteState {
        return {
            ...state,
            path: routes.LOADING_ROUTE,
        }
    },

    [actionTypes.CONFIG_RESPONSE]: function(state: IRouteState, action: IBaseAction): IRouteState {
        return {
            ...state,
            path: routes.LOADING_ROUTE,
        }
    },

    [actionTypes.CONFIG_ERROR]: function(state: IRouteState, action: IBaseAction): IRouteState {
        return {
            ...state,
            path: routes.ERROR_ROUTE,
        }
    },

    [actionTypes.GAMES_JOIN_ERROR]: function(state: IRouteState, action: IBaseAction): IRouteState {
        return {
            ...state,
            path: routes.ERROR_ROUTE,
        }
    },

    [actionTypes.GAMES_LEAVE_ERROR]: function(state: IRouteState, action: IBaseAction): IRouteState {
        return {
            ...state,
            path: routes.ERROR_ROUTE,
        }
    },

    [actionTypes.USER_INFO_RESPONSE]: function(state: IRouteState, action: IBaseAction): IRouteState {
        if (action.payload.userInfo.isAuthenticated) {
            return {
                ...state,
                path: routes.HOME_ROUTE,
            }
        }
        return {
            ...state,
            path: routes.LOGIN_ROUTE,
        }
    },

    [actionTypes.USER_LOGIN_RESPONSE]: function(state: IRouteState, action: IBaseAction): IRouteState {
        if (action.payload.userInfo.isAuthenticated) {
            return {
                ...state,
                path: routes.HOME_ROUTE,
            }
        }
        return {
            ...state,
            path: routes.LOGIN_ROUTE,
        }
    },

    [actionTypes.NAVIGATE]: function(state: IRouteState, action: IBaseAction): IRouteState {
        return {
            ...state,
            path: action.payload.route,
        }
    },

    [actionTypes.NEW_GAME_SUCCESS]: function(state: IRouteState, action: IBaseAction): IRouteState {
        return {
            ...state,
            path: routes.LOBBY_ROUTE,
        }
    },

    [actionTypes.GAMES_JOIN_SUCCESS]: function(state: IRouteState, action: IBaseAction): IRouteState {
        return {
            ...state,
            path: routes.LOBBY_ROUTE,
        }
    },

    [actionTypes.GAMES_LEAVE_SUCCESS]: function(state: IRouteState, action: IBaseAction): IRouteState {
        return {
            ...state,
            path: routes.GAMES_ROUTE,
        }
    },

    [actionTypes.STATE_RECEIVE]: function(state: IRouteState, action: IBaseAction): IRouteState {
        if (action.payload.data.inLobby) {
            return {
                ...state,
                path: routes.LOBBY_ROUTE,
            }
        }
        if (action.payload.data.inGame) {
            return {
                ...state,
                path: routes.GAME_ROUTE,
            }
        }
    },
}
