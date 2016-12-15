import {
    IBaseAction,
} from 'actions/base'
import * as actionTypes from 'constants/actionTypes'
import { IRegisterState, initialState, } from 'state'


export default function loginReducer(state: IRegisterState, action: IBaseAction): IRegisterState {
    switch (action.type) {
    case actionTypes.USER_REGISTER_REQUEST:
        return Object.assign({}, state, {
            loading: true,
            error: false,
        })
    case actionTypes.USER_REGISTER_RESPONSE:
        return Object.assign({}, state, {
            loading: false,
            data: action.payload.registerInfo,
        })
    case actionTypes.USER_REGISTER_ERROR:
        return Object.assign({}, state, {
            loading: false,
            error: true,
            message: action.payload.message,
        })
    default:
        return state || initialState.register
    }
}
