import {
    GAMES_RECEIVE,
    GAMES_NEW_CREATE,
    GAMES_NEW_SUCCESS,
    GAMES_NEW_ERROR,
    GAMES_JOIN,
    GAMES_JOIN_SUCCESS,
    GAMES_JOIN_ERROR,
    GAMES_LEAVE,
    GAMES_LEAVE_SUCCESS,
    GAMES_LEAVE_ERROR,
} from 'constants/actionTypes'


export function receiveGames(data) {
    return {
        type: GAMES_RECEIVE,
        payload: {
            data,
        },
    }
}

export function createNewGame() {
    return {
        type: GAMES_NEW_CREATE,
    }
}

export function responseNewGame(response) {
    if (response.success) {
        return {
            type: GAMES_NEW_SUCCESS,
        }
    }
    return {
        type: GAMES_NEW_ERROR,
    }
}

export function joinGame() {
    return {
        type: GAMES_JOIN,
    }
}

export function responseJoinGame(response) {
    if (response.success) {
        return {
            type: GAMES_JOIN_SUCCESS,
        }
    }
    return {
        type: GAMES_JOIN_ERROR,
    }
}

export function leaveGame() {
    return {
        type: GAMES_LEAVE,
    }
}

export function responseLeaveGame(response) {
    if (response.success) {
        return {
            type: GAMES_LEAVE_SUCCESS,
        }
    }
    return {
        type: GAMES_LEAVE_ERROR,
    }
}
