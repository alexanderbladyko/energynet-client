import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import { IUserInfoState, initialState, } from 'state'


export default function loginReducer(state: IUserInfoState, action: IBaseAction): IUserInfoState {
    switch (action.type) {
    case actionTypes.USER_LOGIN_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
        }
    case actionTypes.USER_LOGIN_RESPONSE:
        return Object.assign({}, state, {
            loading: false,
            data: action.payload.userInfo,
        })
    case actionTypes.USER_LOGIN_ERROR:
        return Object.assign({}, state, {
            loading: false,
            error: true,
            message: action.payload.message,
        })
    default:
        return state || initialState.userInfo
    }
}
