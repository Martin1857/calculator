function add(a, b) {  // Function to add two numbers
  return a + b;
}

function subtract(a, b) { // Function to subtract two numbers
  return a - b;
}

function multiply(a, b) { // Function to multiply two numbers
  return a * b;
}

function divide(a, b) { // Function to divide two numbers
  if (b === 0) {
    return "Error";
  }
  return a / b;
}

function operate(operator, a, b) {  // Function to perform the operation based on the operator 
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

const display = document.querySelector(".display"); // Display element
const buttons = document.querySelectorAll("button");  // All buttons
let firstNumber = ""; // First number to be operated on
let secondNumber = "";  // Second number to be operated on
let currentOperator = null; // Current operator to be used for the operation
let shouldResetDisplay = false; // Flag to reset the display

buttons.forEach((button) => { // Add event listener to all buttons 
  button.addEventListener("click", () => handleButtonClick(button.textContent));  // Call handleButtonClick function on click
});

function handleButtonClick(value) { // Function to handle the button click event
  if (!isNaN(value) || value === ".") { // If the value is a number or a decimal point, append the number to the display
    appendNumber(value);
  } else if (["+", "-", "*", "/"].includes(value)) {  // If the value is an operator, set the operator
    setOperator(value);
  } else if (value === "=") { // If the value is "=", evaluate the expression
    evaluate();
  } else if (value === "C") { // If the value is "C", clear the display
    clear();
  } else if (value === "←") { // If the value is "←", remove the last character from the display
    backspace();
  }
}

function appendNumber(number) { // Function to append the number to the display
  if (shouldResetDisplay) {
    display.textContent = "";
    shouldResetDisplay = false;
  }
  display.textContent += number;
}

function setOperator(operator) {  // Function to set the operator for the operation
  if (currentOperator !== null) evaluate(); // If there is an operator, evaluate the expression
  firstNumber = display.textContent;  // Set the first number to the display content
  currentOperator = operator; 
  shouldResetDisplay = true;
}

function evaluate() { // Function to evaluate the expression based on the operator and numbers
  if (currentOperator === null || shouldResetDisplay) return; // If there is no operator or display needs to be reset, return
  secondNumber = display.textContent; // Set the second number to the display content
  display.textContent = operate(  // Perform the operation based on the operator
    currentOperator,  
    parseFloat(firstNumber),  
    parseFloat(secondNumber)
  );
  currentOperator = null;
}

function clear() {  // Function to clear the display and reset the numbers and operator
  display.textContent = "0";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  shouldResetDisplay = false;
}

function backspace() {  // Function to remove the last character from the display
  display.textContent = display.textContent.slice(0, -1); // Remove the last character from the display
  if (display.textContent === "") { // If the display is empty, set it to 0
    display.textContent = "0";
  }
}
