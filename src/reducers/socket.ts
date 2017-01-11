import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import { ISocketState, } from 'state'


export default {
    [actionTypes.SOCKET_CONNECTED]: function(state: ISocketState, action: IBaseAction): ISocketState {
        return {
            ...state,
            connected: true,
        }
    },

    [actionTypes.SOCKET_DISCONNECTED]: function(state: ISocketState, action: IBaseAction): ISocketState {
        return {
            ...state,
            connected: false,
        }
    },
}
