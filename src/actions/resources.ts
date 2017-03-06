import {
    IBaseAction,
    IDataAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export function requestResources(): IBaseAction {
    return {
        type: actionTypes.RESOURCES_REQUEST,
    }
}

export function receiveResources(data: State.IResources): IDataAction<State.IResources> {
    return {
        type: actionTypes.RESOURCES_RECEIVE,
        payload: {
            data: data,
        },
    }
}
