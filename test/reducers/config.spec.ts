/// <reference path="../../node_modules/@types/jest/index.d.ts" />

import * as deepFreeze from 'deep-freeze'

import { IBaseAction, } from 'actions/base'
import reducer from 'reducers/config'
import * as actionTypes from 'constants/actionTypes'
import { IConfigState, } from 'state'

const state: IConfigState = {
    error: false,
    loading: false,
}

describe('config reducer', () => {
    it('should handle CONFIG_REQUEST', () => {
        deepFreeze(state)

        const action: IBaseAction = {
            type: actionTypes.CONFIG_REQUEST,
        }

        const result: IConfigState = reducer[actionTypes.CONFIG_REQUEST](state, action)

        const expectedState: IConfigState = {
            error: false,
            loading: true,
        }
        expect(result).toEqual(expectedState)
    })
})
