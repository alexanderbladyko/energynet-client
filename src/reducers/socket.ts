import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export default {
    [actionTypes.SOCKET_CONNECTED]: function(state: State.ISocketState, action: IBaseAction): State.ISocketState {
        return {
            ...state,
            connected: true,
        }
    },

    [actionTypes.SOCKET_DISCONNECTED]: function(state: State.ISocketState, action: IBaseAction): State.ISocketState {
        return {
            ...state,
            connected: false,
        }
    },
}
