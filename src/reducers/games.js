import initialState from 'reducers/initialState'
import {
    GAMES_RECEIVE,
    GAMES_JOIN,
} from 'constants/actionTypes'


export default function games(state = initialState.games, action) {
    switch (action.type) {
    case GAMES_RECEIVE:
        return {
            ...state,
            loading: false,
            data: action.payload.data,
        }
    case GAMES_JOIN:
        return {
            ...state,
            loading: true,
        }
    default:
        return state
    }
}
