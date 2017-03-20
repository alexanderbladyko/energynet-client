import {
    IBaseAction,
    IDataAction,
} from 'actions/base'
import {
    IGameAction,
} from 'actions/game'
import * as actionTypes from 'constants/actionTypes'
import * as constants from 'constants'
import * as State from 'state'


export default {
    [actionTypes.MAIN_PANEL_SELECT]:
            function(state: State.IMainPanelState, action: IDataAction<State.MainPanelTabs>): State.IMainPanelState {
        return {
            ...state,
            selectedTab: action.payload.data,
        }
    },

    [actionTypes.MAIN_PANEL_TOGGLE_LOCK]: function(state: State.IMainPanelState, action: IBaseAction): State.IMainPanelState {
        return {
            ...state,
            locked: !state.locked,
        }
    },

    [actionTypes.GAME_INFO_RECEIVE]: function(state: State.IMainPanelState, action: IGameAction): State.IMainPanelState {
        if (state.locked) {
            return state
        }
        let selectedTab: State.MainPanelTabs = State.MainPanelTabs.Action
        return {
            ...state,
            selectedTab,
        }
    },
}
