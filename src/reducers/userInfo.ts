import {
    IBaseAction,
    IDataAction,
    IErrorAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export default {
    [actionTypes.USER_INFO_REQUEST]: function(state: State.IUserInfoState, action: IBaseAction): State.IUserInfoState {
        return {
            ...state,
            loading: true,
        }
    },

    [actionTypes.USER_LOGIN_REQUEST]: function(state: State.IUserInfoState, action: IBaseAction): State.IUserInfoState {
        return {
            ...state,
            loading: true,
        }
    },

    [actionTypes.USER_INFO_RESPONSE]: function(state: State.IUserInfoState, action: IDataAction<State.IUserInfo>): State.IUserInfoState {
        return {
            ...state,
            loading: false,
            data: action.payload.data,
        }
    },

    [actionTypes.USER_LOGIN_RESPONSE]: function(state: State.IUserInfoState, action: IDataAction<State.IUserInfo>): State.IUserInfoState {
        return {
            ...state,
            loading: false,
            data: action.payload.data,
        }
    },

    [actionTypes.USER_INFO_ERROR]: function(state: State.IUserInfoState, action: IErrorAction): State.IUserInfoState {
        return {
            ...state,
            loading: false,
            message: action.payload.message,
        }
    },
}
