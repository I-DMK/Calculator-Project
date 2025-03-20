// Select elements
const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equals");
const backspaceButton = document.querySelector(".backspace");

// Variables to store user input
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

// Function to update display
function updateDisplay(value) {
    if (shouldResetDisplay) {
        display.textContent = value;
        shouldResetDisplay = false;
    } else {
        display.textContent = display.textContent === "0" ? value : display.textContent + value;
    }
}

// Handle number button clicks
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        updateDisplay(button.textContent);
    });
});

// Handle operator button clicks
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (currentOperator !== null && !shouldResetDisplay) {
            secondNumber = display.textContent;
            display.textContent = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
            firstNumber = display.textContent;
        } else {
            firstNumber = display.textContent;
        }
        currentOperator = button.textContent;
        shouldResetDisplay = true;
    });
});

// Handle equals button
equalsButton.addEventListener("click", () => {
    if (currentOperator === null || shouldResetDisplay) return;

    secondNumber = display.textContent;
    const result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));

    if (result === "Error: Division by zero!") {
        display.textContent = "😡 Error!";
    } else {
        display.textContent = result;
    }

    firstNumber = display.textContent;
    secondNumber = "";
    currentOperator = null;
    shouldResetDisplay = true;
});

// Handle clear button (reset calculator)
clearButton.addEventListener("click", () => {
    display.textContent = "0";
    firstNumber = "";
    secondNumber = "";
    currentOperator = null;
    shouldResetDisplay = false;
});

// Prevent multiple decimals in one number
document.addEventListener("keydown", (e) => {
    if (e.key === "." && display.textContent.includes(".")) {
        e.preventDefault();
    }
});

// Math functions
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? "Error: Division by zero!" : a / b; }

// Operate function to handle calculations
function operate(operator, num1, num2) {
    switch (operator) {
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case '*': return multiply(num1, num2);
        case '/': return divide(num1, num2);
        default: return "Error: Invalid operator!";
    }
}

backspaceButton.addEventListener("click", () => {
    if (display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, -1);
    } else {
        display.textContent = "0";
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key >= "0" && event.key <= "9") {
        updateDisplay(event.key);
    } else if (["+", "-", "*", "/"].includes(event.key)) {
        if (currentOperator !== null && !shouldResetDisplay) {
            secondNumber = display.textContent;
            display.textContent = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
            firstNumber = display.textContent;
        } else {
            firstNumber = display.textContent;
        }
        currentOperator = event.key;
        shouldResetDisplay = true;
    } else if (event.key === "=" || event.key === "Enter") {
        equalsButton.click();
    } else if (event.key === "Backspace") {
        backspaceButton.click();
    } else if (event.key === "Escape") {
        clearButton.click();
    } else if (event.key === ".") {
        if (!display.textContent.includes(".")) {
            updateDisplay(".");
        }
    }
});
