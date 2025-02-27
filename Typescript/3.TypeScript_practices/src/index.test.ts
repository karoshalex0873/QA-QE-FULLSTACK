import { addNumbers, displayInformation, subtraction, userInfo } from "."
// Test 1
test('adds 1 + 2 to equal 3', () => {
  expect(addNumbers(1, 2)).toBe(3)
})
// Test 2
test('subtracts 2 - 1 to equal 1', () => {
  expect(subtraction(2, 1)).toBe(1)
})
// Test 
const sampleTest: userInfo = {
  name: 'example',
  age: 13,
  isEligible: true,
};

test('should display a string if the user is eligible', () => {
  expect(displayInformation(sampleTest)).toBe('example isEligible to vote false');
});


