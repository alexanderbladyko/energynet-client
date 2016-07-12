import initialState from 'reducers/initialState'
import {
    USER_INFO_REQUEST,
    USER_INFO_RESPONSE,
    USER_INFO_ERROR,
} from 'constants/actionTypes'


export default function userInfoReducer(state = initialState.userInfo, action) {
    switch (action.type) {
    case USER_INFO_REQUEST:
        return {
            ...state,
            loading: true,
        }
    case USER_INFO_RESPONSE:
        return {
            ...state,
            loading: false,
            isAuthenticated: action.payload.userInfo.isAuthenticated,
        }
    case USER_INFO_ERROR:
        return {
            ...state,
            loading: false,
            message: action.payload.message,
        }
    default:
        return state
    }
}
