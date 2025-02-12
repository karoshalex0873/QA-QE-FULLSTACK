let currentInput = "";
console.log(currentInput);

const appendNumber = (number) =>
{
  if(currentInput === "0" && number !== "."){
    (currentInput = number)
  }
  else{
    (currentInput += number);
  }
  showOnScreen()
}  
const deleteScreen = () =>{
 if(currentInput.length>1){
  currentInput=currentInput.slice(0,-1)
 }
else{
currentInput = '0'
}
showOnScreen()
}
const clearScreen = () =>{
  if(currentInput !== 0){
    currentInput ='0'
  }
  showOnScreen()
}
const appendOperator = (operator) =>{
  if (currentInput.length > 0 && !isNaN(currentInput[currentInput.length -1])){
    currentInput += operator
  }
  showOnScreen()
}

const calculation = () =>{
  try {
    if (currentInput.length === 0 || isNaN(currentInput[currentInput.length - 1])) {
      return; // Prevent errors on empty input or trailing operator
    }
    currentInput = eval(currentInput).toString();
    showOnScreen()
  } catch (error) {
    currentInput = "Error";
    updateScreen();
    setTimeout(() => {
      clearScreen();
    }, 1500);
  }
}

const showOnScreen = () => document.getElementById("screen").innerText =currentInput || "0"
