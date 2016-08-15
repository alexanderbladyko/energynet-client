import initialState from 'reducers/initialState'
import {
    LOBBY_GET,
    LOBBY_RECEIVE,
} from 'constants/actionTypes'


export default function lobby(state = initialState.lobby, action) {
    switch (action.type) {
    case LOBBY_GET:
        return {
            ...state,
            loading: true,
        }
    case LOBBY_RECEIVE:
        return {
            ...state,
            loading: false,
            data: action.payload.data,
        }
    default:
        return state
    }
}
