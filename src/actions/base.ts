import { Action } from 'redux'


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
