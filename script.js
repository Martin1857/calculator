function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error";
  }
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => handleButtonClick(button.textContent));
});

function handleButtonClick(value) {
  if (!isNaN(value) || value === ".") {
    appendNumber(value);
  } else if (["+", "-", "*", "/"].includes(value)) {
    setOperator(value);
  } else if (value === "=") {
    evaluate();
  } else if (value === "C") {
    clear();
  } else if (value === "←") {
    backspace();
  }
}

function appendNumber(number) {
  if (shouldResetDisplay) {
    display.textContent = "";
    shouldResetDisplay = false;
  }
  display.textContent += number;
}

function setOperator(operator) {
  if (currentOperator !== null) evaluate();
  firstNumber = display.textContent;
  currentOperator = operator;
  shouldResetDisplay = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;
  secondNumber = display.textContent;
  display.textContent = operate(
    currentOperator,
    parseFloat(firstNumber),
    parseFloat(secondNumber)
  );
  currentOperator = null;
}

function clear() {
  display.textContent = "0";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  shouldResetDisplay = false;
}

function backspace() {
  display.textContent = display.textContent.slice(0, -1);
  if (display.textContent === "") {
    display.textContent = "0";
  }
}
