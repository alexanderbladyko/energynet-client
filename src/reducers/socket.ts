import {
    IBaseAction,
} from '../actions/base'
import * as actionTypes from '../constants/actionTypes'
import { ISocketState, initialState, } from '../state'


export default function socketReducer(state: ISocketState, action: IBaseAction): ISocketState {
    switch (action.type) {
    case actionTypes.SOCKET_CONNECTED:
        return Object.assign(state, {
            connected: true,
        })
    case actionTypes.SOCKET_DISCONNECTED:
        return Object.assign(state, {
            connected: false,
        })
    default:
        return state || initialState.socket
    }
}
