import {
    LOBBY_GET,
    LOBBY_RECEIVE,
} from 'constants/actionTypes'


export function getLobby() {
    return {
        type: LOBBY_GET,
    }
}

export function receiveLobby(data) {
    return {
        type: LOBBY_RECEIVE,
        payload: {
            data,
        },
    }
}
