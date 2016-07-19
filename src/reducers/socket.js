import initialState from 'reducers/initialState'
import {
    SOCKET_CONNECTED,
    SOCKET_DISCONNECTED,
} from 'constants/actionTypes'


export default function socketReducer(state = initialState.socket, action) {
    switch (action.type) {
    case SOCKET_CONNECTED:
        return {
            ...state,
            connected: true,
        }
    case SOCKET_DISCONNECTED:
        return {
            ...state,
            connected: false,
        }
    default:
        return state
    }
}
