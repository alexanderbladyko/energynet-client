import { Action } from 'redux'


export interface IBaseAction extends Action {
    meta?: any,
    payload?: any,
    error?: boolean,
}
