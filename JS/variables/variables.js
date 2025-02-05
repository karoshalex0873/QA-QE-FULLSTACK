// variable name
let age = 25;
const schoolName = "Greenwood High"
const studentList=[]

// let is used to for variables which may the data it holds may change in future
// const old-scholl method of declaring variables

// Naming conventions
// camelCase
let userName = "alice"
// use dollar sign or underscore
let $price = 100;
let _score= 89;

// note the # sign is not use for variable declaration

//here is an exmple of goodNaming for this example
// let MyvariableName = "Javascript"
// best practise

let myVariableName = 'JavaScript'

// determining  the  data type of a variable
// string
console.log(typeof "Hello")
// interger
console.log(typeof 99)
// bolean
console.log(typeof true)
// undefined
console.log(typeof undefined)

// Identify the data types in this array:
// let data = ["Kenya", 34, fale, { country: "USA" }, null]
let data = [ (typeof ("kenya")),(typeof 34),(typeof false),(typeof {county :"usa"}),(typeof null)]
console.log(data)

// How do you define a BigInt in JavaScript? Provide an example
let kenyaWealth = 1500000000000n

// 4. Objects & Arrays
// 11. Create an object person with properties name, age, and city.
// 12. Add a new property email to the person object.
// 13. Declare an array fruits with three fruit names.
// 14. Access the second item in the fruits array.

const person = {name:'alex',age:'25', city:'Nyeri' }
console.log(person)
person.email='akarobia30@gmail.com'
console.log(person)

// fruits array
const fruitsArray=['mango','apple','orange']
console.log(fruitsArray)
// 2nd item
console.log(fruitsArray[1])

// Type coercion
// forms a string
console.log("5"+ 2)
// returns a string 52 instead of 7 
// the + sign concatinate it to string

// if a  (-) sign is used the string "5" becomes a number
console.log("5"-2)

// conversion of number to string and vice verser
// string to number
let string100= '100'
console.log(typeof string100)
let convertedString=(Number(string100))
console.log(typeof convertedString)
// number to string
let number=50
let text=number.toString()
console.log(typeof text)
// 18. What will be the result of this operation?
console.log(5 + true)
// the value holded by true value is 1 hence the it is added to it if you use flase the results are 5
console.log(5 + false)

