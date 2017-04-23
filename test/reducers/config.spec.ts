/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

import { expect, } from 'chai'
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
            loading: false,
        }
        expect(result).to.deep.equals(expectedState)
    })
})
