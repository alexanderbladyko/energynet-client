import initialState from 'reducers/initialState'

import {
    STATE_GET,
    STATE_RECEIVE,
} from 'constants/actionTypes'


export default function stateReducer(state = initialState.state, action) {
    switch (action.type) {
    case STATE_GET:
        return {
            ...state,
            loading: true,
        }
    case STATE_RECEIVE:
        return {
            ...state,
            loading: false,
            data: action.payload.data,
        }
    default:
        return state
    }
}
