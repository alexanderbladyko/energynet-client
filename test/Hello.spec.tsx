/// <reference path="../node_modules/@types/jasmine/index.d.ts" />

import { expect, } from 'chai'

describe('Hello', () => {
    it('should be true', () => {
        expect(5 + 3).to.be.equal(8)
    })
})
