import initialState from 'reducers/initialState'
import {
    LOBBY_RECEIVE,
} from 'constants/actionTypes'


export default function lobby(state = initialState.lobby, action) {
    switch (action.type) {
    case LOBBY_RECEIVE:
        return {
            ...state,
            data: action.payload.data,
        }
    default:
        return state
    }
}
