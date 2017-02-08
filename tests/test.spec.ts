/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

import Calculator from '../src/test';

import {expect} from 'chai';

describe('Calculator', () => {
    it('should add two numbers together (chai)', () => {
        const calc: Calculator = new Calculator();

        // Chai assertion.
        expect(calc.add(5, 3)).to.equal(8);
    });
});

describe('Calculator', () => {
    var subject: Calculator;

    beforeEach(function () {
        subject = new Calculator();
    });

    it('should add two numbers together (mocha)', () => {
        const result: number = subject.add(2, 3);
        if (result !== 5) {
            throw new Error('Expected 2 + 3 = 5 but was ' + result);
        }
    });
});