import {
    LOBBY_RECEIVE,
} from 'constants/actionTypes'


export function receiveLobby(data) {
    return {
        type: LOBBY_RECEIVE,
        payload: {
            data,
        },
    }
}
