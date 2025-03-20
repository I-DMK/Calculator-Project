const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equals");
const backspaceButton = document.querySelector(".backspace");

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
            firstNumber = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
            display.textContent = firstNumber;
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
        setTimeout(() => clearButton.click(), 2000); // Reset after 2 seconds
    } else {
        display.textContent = result;
    }

    firstNumber = display.textContent;
    secondNumber = "";
    currentOperator = null;
    shouldResetDisplay = true;
});

// Handle clear button
clearButton.addEventListener("click", () => {
    display.textContent = "0";
    firstNumber = "";
    secondNumber = "";
    currentOperator = null;
    shouldResetDisplay = false;
});

// Handle backspace button
backspaceButton.addEventListener("click", () => {
    if (display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, -1);
    } else {
        display.textContent = "0";
    }
});

// Prevent multiple decimals and ensure correct decimal entry
document.addEventListener("keydown", (e) => {
    if (e.key === ".") {
        if (shouldResetDisplay || display.textContent === "0") {
            updateDisplay("0.");
        } else if (!display.textContent.includes(".")) {
            updateDisplay(".");
        }
        e.preventDefault();
    }
});

// Handle keyboard input
document.addEventListener("keydown", (event) => {
    if (event.key >= "0" && event.key <= "9") {
        updateDisplay(event.key);
    } else if (["+", "-", "*", "/"].includes(event.key)) {
        if (currentOperator !== null && !shouldResetDisplay) {
            secondNumber = display.textContent;
            firstNumber = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
            display.textContent = firstNumber;
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
    }
});

// Math functions
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? "Error: Division by zero!" : a / b; }

// Operate function
function operate(operator, num1, num2) {
    switch (operator) {
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case '*': return multiply(num1, num2);
        case '/': return divide(num1, num2);
        default: return "Error: Invalid operator!";
    }
}
