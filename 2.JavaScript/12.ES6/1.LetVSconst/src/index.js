// Both let and Const are Es6 Features that offer Block_scope
// example

let length=12   //Global variable

// calculate area
const area=()=>{
  let length=11 // local variable
  return length*length // 144
}
console.log(area())

// Var is not a block variable 