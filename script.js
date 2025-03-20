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
        return "Error: Division by zero!";
    }
    return a / b;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return "Error: Invalid operator!";
    }
}

const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equals");

let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

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

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (currentOperator !== null) {
            secondNumber = display.textContent;
            display.textContent = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
        }
        firstNumber = display.textContent;
        currentOperator = button.textContent;
        shouldResetDisplay = true;
    });
});

equalsButton.addEventListener("click", () => {
    if (currentOperator === null || shouldResetDisplay) return;
    secondNumber = display.textContent;
    display.textContent = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
    firstNumber = display.textContent;
    currentOperator = null;
});

clearButton.addEventListener("click", () => {
    display.textContent = "0";
    firstNumber = "";
    secondNumber = "";
    currentOperator = null;
});
