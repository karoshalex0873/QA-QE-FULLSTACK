"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
// Test 1
test('adds 1 + 2 to equal 3', () => {
    expect((0, _1.addNumbers)(1, 2)).toBe(3);
});
// Test 2
test('subtracts 2 - 1 to equal 1', () => {
    expect((0, _1.subtraction)(2, 1)).toBe(1);
});
