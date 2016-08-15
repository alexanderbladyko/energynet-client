import {
    STATE_GET,
    STATE_RECEIVE,
} from 'constants/actionTypes'


export function getState() {
    return {
        type: STATE_GET,
    }
}

export function receiveState(data) {
    return {
        type: STATE_RECEIVE,
        payload: {
            data,
        },
    }
}
