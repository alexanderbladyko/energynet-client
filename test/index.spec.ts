import { expect } from 'chai'

import { sum } from '../src/index.tsx';

describe('sum function', function() {
    it('should add correctly ', function() {
        expect(sum(3, 4)).to.be.equal(7)
    })
})
