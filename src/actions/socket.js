import {
    SOCKET_CONNECTED,
    SOCKET_DISCONNECTED,
} from 'constants/actionTypes'


export function socketConnect() {
    return {
        type: SOCKET_CONNECTED,
    }
}

export function socketDisconnect() {
    return {
        type: SOCKET_DISCONNECTED,
    }
}
