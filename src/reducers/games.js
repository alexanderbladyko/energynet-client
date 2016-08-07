import initialState from 'reducers/initialState'
import {
    GAMES_RECEIVE,
} from 'constants/actionTypes'


export default function games(state = initialState.games, action) {
    switch (action.type) {
    case GAMES_RECEIVE:
        return {
            ...state,
            data: action.payload.data,
        }
    default:
        return state
    }
}
