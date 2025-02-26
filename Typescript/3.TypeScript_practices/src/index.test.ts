import { addNumbers, subtraction } from "."
// Test 1
test('adds 1 + 2 to equal 3', () => {
  expect(addNumbers(1, 2)).toBe(3)
})
// Test 2
test('subtracts 2 - 1 to equal 1', () => {
  expect(subtraction(2, 1)).toBe(1)
})


