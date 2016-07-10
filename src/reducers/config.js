import {
    CONFIG_REQUEST,
    CONFIG_RESPONSE,
    CONFIG_ERROR,
} from 'constants/actionTypes'
import initialState from './initialState'


export default function config(state = initialState.config, action) {
    switch (action.type) {
    case CONFIG_REQUEST:
        return {
            ...state,
            loading: true,
        }
    case CONFIG_RESPONSE:
        return {
            ...state,
            loading: false,
            data: action.payload.config,
        }
    case CONFIG_ERROR:
        return {
            ...state,
            loading: false,
            message: action.payload.message,
        }
    default:
        return state
    }
}
