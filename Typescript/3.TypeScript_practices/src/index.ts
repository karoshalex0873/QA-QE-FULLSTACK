// function getUsername(username: string | null) { // username can be of type string or null 
//     if (username !== null) {
//         return `User: ${username}`
//     } else {
//         return 'Guest'
//     }
// }

// const result = getUsername(null)
// const result2 = getUsername('alice')
// console.log(result)
// console.log(result2)


// // challenge two 
// type Direction = "up" | "down" | "right" | "left"

// function move(direction: Direction, distance: number) {
//     if (direction === "up") {
//         console.log(`move ${direction} ${distance} meters `)
//     }
//     if (direction === "left") {
//         console.log(`move ${direction}`)
//     }

// }
// move('up', 10)
// move('left', 5)

// // Narrowing
// // Narrowing  using if statment or use ternary operator

// function validateUsername(username: string | null): boolean {
//     return username ? username.length > 5 : false
// }
// //optional two using typeof 
// function validateUsername1(username: string | null): boolean {
//     return typeof username === "string" ? username.length > 5 : false
// }


// console.log(validateUsername(null))
// console.log(validateUsername1('karobia'))

// type APIResponse =
//     | {
//         data: {
//             id: string
//         }
//     }
//     | {
//         error: string
//     }

// const handleResponse = (response: APIResponse) => {
//     if ('data' in response) {
//         return response.data.id
//     } else {
//         throw new Error(response.error)
//     }
// }



// // User Profile
// type UserProfile = {
//     name: string,
//     age: number,
//     email: string,
// }

// const displayInformation = (name: string, age: number, email: string) => {
//     console.log(`User Profile
//     Name: ${name}
//     Age:  ${age}
//     Email: ${email}
//     `)
// }
// displayInformation('karobia', 22, 'Karobia@example.com')

// // Module 2: Working with Objects and Arrays in TypeScript
// // Task Manager

// // 🔹 Goal:
// // Create a simple Task Manager where users can add, list, and remove tasks.
// // Each task has:
// // id (number)
// // title (string)
// // completed (boolean)
// // 🔹 Steps
// // Define a Task type.
// // Implement functions to:
// // Add a new task.
// // List all tasks.
// // Remove a task by ID.

// // task type alias  defination 
// type taskType = {
//     id: number,
//     title: string
//     isCompleted: boolean
// }

// let task:taskType[]=[]
// const addTask = () =>{

// }

export function addNumbers(a: number, b: number): number {
    return a + b;
}

export function subtraction (a: number, b: number): number {
    return a - b
}
// console.log(subtraction(10, 5))