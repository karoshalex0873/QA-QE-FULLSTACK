// Synchronous Code
// Run line by line, one at time
// Each Operation Muxt complete before moving to the next

// Example
console.log("Step 1"); //Step 1
console.log("Step 2"); //Step 2
console.log("Step 3"); //Step 3

// Asynchronous Code
// Allows multiple operations to happen at the same time.
// Long-running tasks (like fetching data or timers) don’t block the main thread.

console.log("Step 1");
setTimeout(() => {
  console.log("Step 2 (after 2 seconds)");
}, 2000);
console.log("Step 3");

// Step 1
// Step 3
// Step 2 (after 2 seconds)

// 2. Callbacks
// Callbacks are functions passed as arguments to other functions to be executed later.

// Example: Basic Callback
function greet(name, callback) {
  console.log("Hello, " + name);
  callback(); // Execute the callback function
}

function sayGoodbye() {
  console.log("Goodbye!");
}

greet("Alice", sayGoodbye);

// Hello, Alice
// Goodbye!

// Example: Asynchronous Callback
function fetchData(callback) {
  setTimeout(() => {
    const data = "Here's your data!";
    callback(data);
  }, 2000);
}

function processData(data) {
  console.log("Processing:", data);
}

fetchData(processData);


// Promises
// Promises are a cleaner way to handle async operations. A Promise represents a value that may be available now, later, or never.

// States of a Promise:
// Pending: Initial state, neither fulfilled nor rejected.

// Fulfilled: The operation completed successfully.

// Rejected: The operation failed.

// Example: Creating a Promise

const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true
    if(success){
      resolve("Data fetched Succsesfully")
    }else{
      reject("Error: Failed to fetch data.");
    }
  }, 2000);
})
myPromise.then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.error(error);
})


// 4: Async/Await
// async/await is syntactic sugar for Promises. It makes async code look and behave like synchronous code.

function fetchData1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve("Data fetched successfully!");
      } else {
        reject("Error: Failed to fetch data.");
      }
    }, 2000);
  });
}

async function processData1() {
  try {
    const result = await fetchData1(); // Wait for the promise to resolve
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

processData1();

// 5: Real-World Example (Fetching Data from an API)
// Let’s combine everything to fetch data from a real API.
async function fetchUserData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    console.log("User Data:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchUserData();