import { Action, } from 'redux'

import * as State from 'state'


export interface IBaseAction extends Action {
}

export interface IErrorAction extends IBaseAction {
    error: boolean,
    payload: {
        message: string
    }
}

export interface IDataAction<T> extends IBaseAction {
    payload: {
        data: T
    }
}

export interface ITypeAction extends IBaseAction {
    payload: {
        type: string
    }
}

export interface ITypeDataAction<T> extends IBaseAction {
    payload: {
        type: string
        data: T
    }
}

export interface IReceiveAction {
    (response: State.IGameActionResponse): IBaseAction|IErrorAction
}

export function generateReceiveGameAction(successType: string, errorType: string): IReceiveAction {
    return (response: State.IGameActionResponse): IBaseAction|IErrorAction => {
        if (response.success) {
            return {
                type: successType,
            }
        }
        return {
            type: errorType,
            error: true,
            payload: {
                message: response.reason,
            },
        }
    }
}
