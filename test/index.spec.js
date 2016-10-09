"use strict";
const chai_1 = require('chai');
const index_tsx_1 = require('../src/index.tsx');
describe('sum function', function () {
    it('should add correctly ', function () {
        chai_1.expect(index_tsx_1.sum(3, 4)).to.be.equal(7);
    });
});
