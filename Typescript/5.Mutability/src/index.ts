// Mutability is the abilityof a value to be changes=d after it has been created

// Primitive types are immutable i.e you can't change them onece they have been created

// example
let stringinfo = "hello"
console.log(stringinfo.toUpperCase()) //HELLO
console.log(stringinfo) //hello 
// In the above example the stringinfo after various operation still it has not be changed at at all

// Object  and Array are mutable
const arr: number[] = [1, 2, 3, 4, 5,]
arr.push(6)
console.log(arr) //[ 1, 2, 3, 4, 5, 6 ]

const users = {
    name: "alice",
    age: 30
}
const object = { users }
object.users.age = 31
console.log(object) //{ users: { name: 'alice', age: 31 } }


// ways to make object immutable
// using  readonly property or utility like Readonly<T>



// type ButtonAttributes = {
//     type: "button" | "submit" | "reset";
// };

// const modifyButtons = (attributes: ButtonAttributes[]) => { };

// const buttonsToChange: ButtonAttributes[] = [
//     {
//         type: "button",
//     },
//     {
//         type: "submit",
//     },
// ];

// modifyButtons(buttonsToChange);




// // name.push('John')
// function printNames(names: string[]) {
//     for (const name of names) {
//         console.log(name);
//     }

// //   Unused '@ts-expect-error' directive.
//         names.push("John");


// //   Unused '@ts-expect-error' directive.
//         names[0] = "Billy"; }
