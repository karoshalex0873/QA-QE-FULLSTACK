let currentInput = "";

const appendNumber = (number) => {
  if (currentInput === "0" && number !== ".") {
    currentInput = number;
  } else {
    currentInput += number;
  }
  showOnScreen();
};

const deleteScreen = () => {
  currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
  showOnScreen();
};

const clearScreen = () => {
  currentInput = "0";
  showOnScreen();
};

const appendOperator = (operator) => {
  if (currentInput && !isNaN(currentInput.slice(-1))) {
    currentInput += operator;
  }
  showOnScreen();
};

const calculation = () => {
  try {
    if (!currentInput || isNaN(currentInput.slice(-1))) return;
    currentInput = String(Number(eval(currentInput)));
    showOnScreen();
  } catch {
    currentInput = "Error";
    showOnScreen();
    setTimeout(clearScreen, 1500);
  }
};

const showOnScreen = () => {
  document.getElementById("screen").innerText = currentInput || "0";
};
