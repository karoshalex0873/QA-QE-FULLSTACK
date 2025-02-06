// // string properties
// // length
// let studentName = 'Alice'
// console.log(studentName.length)

// // charAt -return specifed index in a string
// console.log(studentName.charAt(3))

// // concat method -joins two string
// //   two ways 1. es5 or es6
// // es5
// let firstName = 'Julia'
// let secondName = 'Karobia'
// console.log(firstName.concat(' '+secondName))

// // es6 -template strings
// console.log(`${firstName} ${secondName}`)

// // indexOf  retuns the firt index ina given string
// // example
// console.log(secondName.indexOf('a'))  // the a in karobia is in the 2nd index of the the array

// // include property checks in the string contains a carint key
// console.log(secondName.includes('a')) // returns [true]
// // the second name contain  'a' hence results are true

// // 6. toLowerCase and uppercase -makes a string to lower case
// console.log(` lower_case: ${firstName.toLowerCase()}    upper_case  ${secondName.toUpperCase()} `)

// // slipt  split an object(string) into arrays
// console.log(firstName.split('')) //[ 'J', 'u', 'l', 'i', 'a' ]
// // reversing and joining
// console.log(firstName.split('').reverse().join(''))

// // substing splict and return part of a string
// console.log(secondName.substring(5,7)) // i and a are in the index of 5 and 7

// // substr method
// console.log(secondName.substr(4,3
// ))

// //   Asiigments of the Day
// input is a string ?
const is_string = (input) =>
  typeof input === "string" ? "true (it is a string)" : "false (not a string)";
console.log(is_string("w3resource"));
console.log(is_string([1, 2, 44, 0]));

// 2. Blank
const is_blank = (input) => (input === "" ? "true" : "false");
console.log(is_blank(""));
console.log(is_blank("abc"));

// 3. array of words
const string_to_array = (string) => {
  const arrayofString = string.split(" ");
  return arrayofString;
};
console.log(string_to_array("Robin Singh"));

// 4. Extract string
const truncate_string = (string, char) => {
  const trancate = string.substr(0, char);
  return trancate;
};
console.log(truncate_string("Robin Singh", 4));

// 5. Abbreviate Name
const abbrev_name = (name) => {
  // spliting the name
  const split = name.trim().split(" ");
  return `${split[0]} ${split[1][0]}`;
};
console.log(abbrev_name("Robin Singh"));

// 6. Hide email address
const protect_email = (email) => {
  // extract email section using replace method
  const replacedEmail = email.replace("_singh", "...");
  return replacedEmail;
};
console.log(protect_email("robin_singh@gmail.com"));

// 7. Parameterize string
const string_parameterize = (string) => {
  const parametizedString = string
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 -]/, "")
    .replace(/\s/g, "-");
  return parametizedString;
};
console.log(string_parameterize("Robin Singh from USA."));

//8. Capitalize First Letter
const capitalize = (string) => {
  const output = string.split(" ");
  for (let i = 0; i < output.length; i++) {
    output[i] = output[i][0].toUpperCase() + output[i].substr(1);
  }
  return output.join(" ");
};
console.log(capitalize("js string exerciese"));
// 10. Swap Case
const swapcase = (string) => {
  const swapping = string.split("");
  for (let i = 0; i < swapping.length; i++) {
    swapping[i] =
      swapping[i] === swapping[i].toUpperCase()
        ? swapping[i].toLowerCase()
        : swapping[i].toUpperCase();
  }
  return swapping.join("");
};

console.log(swapcase("AaBbc"));

// 11 Camelizing string
const camelize = (string) => {
  const camelizeString = string.split(" ");
  return camelizeString;
};
console.log(camelize("JavaScript Exercises"));
