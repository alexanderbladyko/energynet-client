import {
    IBaseAction,
    IDataAction,
    IErrorAction,
} from 'actions/base'
import {
    IRouteAction,
} from 'actions/route'
import * as routes from 'constants/routes'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export default {
    before: function(state: State.IRouteState, action: IBaseAction): State.IRouteState {
        if (state && state.path === routes.ERROR_ROUTE) {
            return state
        }
    },

    [actionTypes.CONFIG_REQUEST]: function(state: State.IRouteState, action: IBaseAction): State.IRouteState {
        return {
            ...state,
            path: routes.LOADING_ROUTE,
        }
    },

    [actionTypes.CONFIG_RESPONSE]: function(state: State.IRouteState, action: IDataAction<State.IConfig>): State.IRouteState {
        return {
            ...state,
            path: routes.LOADING_ROUTE,
        }
    },

    [actionTypes.CONFIG_ERROR]: function(state: State.IRouteState, action: IErrorAction): State.IRouteState {
        return {
            ...state,
            path: routes.ERROR_ROUTE,
        }
    },

    [actionTypes.GAMES_JOIN_ERROR]: function(state: State.IRouteState, action: IErrorAction): State.IRouteState {
        return {
            ...state,
            path: routes.ERROR_ROUTE,
        }
    },

    [actionTypes.GAMES_LEAVE_ERROR]: function(state: State.IRouteState, action: IErrorAction): State.IRouteState {
        return {
            ...state,
            path: routes.ERROR_ROUTE,
        }
    },

    [actionTypes.USER_INFO_RESPONSE]: function(state: State.IRouteState, action: IDataAction<State.IUserInfo>): State.IRouteState {
        if (action.payload.data.isAuthenticated) {
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

    [actionTypes.USER_LOGIN_RESPONSE]: function(state: State.IRouteState, action: IDataAction<State.IUserInfo>): State.IRouteState {
        if (action.payload.data.isAuthenticated) {
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

    [actionTypes.NAVIGATE]: function(state: State.IRouteState, action: IRouteAction): State.IRouteState {
        return {
            ...state,
            path: action.payload.route,
        }
    },

    [actionTypes.NEW_GAME_SUCCESS]: function(state: State.IRouteState, action: IBaseAction): State.IRouteState {
        return {
            ...state,
            path: routes.LOBBY_ROUTE,
        }
    },

    [actionTypes.GAMES_JOIN_SUCCESS]: function(state: State.IRouteState, action: IBaseAction): State.IRouteState {
        return {
            ...state,
            path: routes.LOBBY_ROUTE,
        }
    },

    [actionTypes.GAMES_LEAVE_SUCCESS]: function(state: State.IRouteState, action: IBaseAction): State.IRouteState {
        return {
            ...state,
            path: routes.GAMES_ROUTE,
        }
    },

    [actionTypes.STATE_RECEIVE]: function(state: State.IRouteState, action: IDataAction<State.IGameStatus>): State.IRouteState {
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
