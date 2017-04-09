import {
    IBaseAction,
    IDataAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export function selectTab(userId: State.MainPanelTabs):
        IDataAction<State.MainPanelTabs> {
    return {
        type: actionTypes.MAIN_PANEL_SELECT,
        payload: {
            data: userId,
        },
    }
}

export function toggleTab(): IBaseAction {
    return {
        type: actionTypes.MAIN_PANEL_TOGGLE_LOCK,
    }
}

export function togglePanels(): IBaseAction {
    return {
        type: actionTypes.MAIN_PANEL_TOGGLE,
    }
}
