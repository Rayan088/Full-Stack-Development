import {formatCurrency} from "../scripts/utils/money.js";

// Jasmine is a JS testing framework
// describe() groups related tests together, (title)
// it() defines one indivisual test, (test title)
// expect() creates an expectation/assertion

// Passed tests marked with . and failed marked with x

describe('Test suite: formatCurrency', () => {
    it('converts cents into dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('Tests with 0 value', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('Tests round method to round up', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    })
});