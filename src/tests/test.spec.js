/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
"use strict";
var test_1 = require("../test");
var chai_1 = require("chai");
describe('Calculator', function () {
    it('should add two numbers together (chai)', function () {
        var calc = new test_1["default"]();
        // Chai assertion.
        chai_1.expect(calc.add(5, 3)).to.equal(8);
    });
});
describe('Calculator', function () {
    var subject;
    beforeEach(function () {
        subject = new test_1["default"]();
    });
    it('should add two numbers together (mocha)', function () {
        var result = subject.add(2, 3);
        if (result !== 5) {
            throw new Error('Expected 2 + 3 = 5 but was ' + result);
        }
    });
});
