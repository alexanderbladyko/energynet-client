import * as actionTypes from 'constants/actionTypes'
import { IBaseAction } from './base'


interface IChangeCounterAction extends IBaseAction {
    payload: {
        delta: number,
    },
}

export function increaseCounter(): IChangeCounterAction {
    return {
        payload: {
            delta: 1,
        },
        type: actionTypes.CHANGE_COUNTER,
    }
}

export function decreaseCounter(): IChangeCounterAction {
    return {
        payload: {
            delta: -1,
        },
        type: actionTypes.CHANGE_COUNTER,
    }
}
