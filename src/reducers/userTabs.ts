import {
    IBaseAction,
    IDataAction,
} from 'actions/base'
import {
    IGameAction,
} from 'actions/game'
import * as actionTypes from 'constants/actionTypes'

import * as State from 'state'


export default {
    [actionTypes.USER_TABS_SELECT]: function(state: State.IUserTabsState, action: IDataAction<number>): State.IUserTabsState {
        return {
            ...state,
            selectedUserId: action.payload.data,
        }
    },

    [actionTypes.USER_TABS_TOGGLE_LOCK]: function(state: State.IUserTabsState, action: IBaseAction): State.IUserTabsState {
        return {
            ...state,
            locked: !state.locked,
        }
    },

    [actionTypes.GAME_INFO_RECEIVE]: function(state: State.IUserTabsState, action: IGameAction): State.IUserTabsState {
        if (state.locked) {
            return state
        }
        return {
            ...state,
            selectedUserId: action.meta.turn,
        }
    },
}
