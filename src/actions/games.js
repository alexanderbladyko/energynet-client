import {
    GAMES_RECEIVE,
    GAMES_NEW_CREATE,
    GAMES_NEW_SUCCESS,
    GAMES_NEW_ERROR,
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
