import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import { IRegisterState, } from 'state'


export default {
    [actionTypes.USER_REGISTER_REQUEST]: function(state: IRegisterState, action: IBaseAction): IRegisterState {
        return {
            ...state,
            loading: true,
            error: false,
        }
    },

    [actionTypes.USER_REGISTER_RESPONSE]: function(state: IRegisterState, action: IBaseAction): IRegisterState {
        return {
            ...state,
            loading: false,
            data: action.payload.registerInfo,
        }
    },

    [actionTypes.USER_REGISTER_ERROR]: function(state: IRegisterState, action: IBaseAction): IRegisterState {
        return {
            ...state,
            loading: false,
            error: true,
            message: action.payload.message,
        }
    },
}
