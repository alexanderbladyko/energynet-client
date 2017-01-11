import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import { IUserInfoState, } from 'state'


export default {
    [actionTypes.USER_LOGIN_REQUEST]: function(state: IUserInfoState, action: IBaseAction): IUserInfoState {
        return {
            ...state,
            loading: true,
            error: false,
        }
    },

    [actionTypes.USER_LOGIN_RESPONSE]: function(state: IUserInfoState, action: IBaseAction): IUserInfoState {
        return {
            ...state,
            loading: false,
            data: action.payload.userInfo,
        }
    },

    [actionTypes.USER_LOGIN_ERROR]: function(state: IUserInfoState, action: IBaseAction): IUserInfoState {
        return {
            ...state,
            loading: false,
            error: true,
            message: action.payload.message,
        }
    },
}
