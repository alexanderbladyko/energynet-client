import {
    IBaseAction,
    IDataAction,
    IErrorAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import * as State from 'state'


export default {
    [actionTypes.USER_REGISTER_REQUEST]: function(state: State.IRegisterState, action: IBaseAction): State.IRegisterState {
        return {
            ...state,
            loading: true,
            error: false,
            loaded: false,
        }
    },

    [actionTypes.USER_REGISTER_RESPONSE]:
        function(state: State.IRegisterState, action: IDataAction<State.IRegister>): State.IRegisterState {
            return {
                ...state,
                loading: false,
                data: action.payload.data,
            }
        },

    [actionTypes.USER_REGISTER_ERROR]: function(state: State.IRegisterState, action: IErrorAction): State.IRegisterState {
        return {
            ...state,
            loading: false,
            loaded: false,
            error: true,
            message: action.payload.message,
        }
    },
}
