import { IBaseAction, } from 'actions/base'
import * as actionTypes from 'constants/actionTypes'


export function socketConnecting(): IBaseAction {
    return {
        type: actionTypes.SOCKET_CONNECTING,
    }
}

export function socketConnected(): IBaseAction {
    return {
        type: actionTypes.SOCKET_CONNECTED,
    }
}

export function errorConfig(): IBaseAction {
    return {
        type: actionTypes.SOCKET_DISCONNECTED,
    }
}
