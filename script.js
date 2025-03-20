function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a -b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b=== 0) {
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

// Testing the operate function in the console
console.log(operate('+', 4, 6));  // Expected output: 10
console.log(operate('-', 10, 3)); // Expected output: 7
console.log(operate('*', 7, 2));  // Expected output: 14
console.log(operate('/', 9, 3));  // Expected output: 3
console.log(operate('/', 5, 0));  // Expected output: "Error: Division by zero!"
console.log(operate('%', 10, 2)); // Expected output: "Error: Invalid operator!"