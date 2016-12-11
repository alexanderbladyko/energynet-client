import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import { IUserInfoState, initialState, } from 'state'


export default function userInfoReducer(state: IUserInfoState, action: IBaseAction): IUserInfoState {
    switch (action.type) {
    case actionTypes.USER_INFO_REQUEST:
    case actionTypes.USER_LOGIN_REQUEST:
        return Object.assign({}, state, {
            loading: true,
        })
    case actionTypes.USER_INFO_RESPONSE:
    case actionTypes.USER_LOGIN_RESPONSE:
        return Object.assign({}, state, {
            loading: false,
            data: action.payload.userInfo,
        })
    case actionTypes.USER_INFO_ERROR:
    case actionTypes.USER_LOGIN_ERROR:
        return Object.assign({}, state, {
            loading: false,
            message: action.payload.message,
        })
    default:
        return state || initialState.userInfo
    }
}
