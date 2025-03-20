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

// Testing in the console
console.log(add(3, 5));        // Expected output: 8
console.log(subtract(10, 4));  // Expected output: 6
console.log(multiply(6, 7));   // Expected output: 42
console.log(divide(20, 4));    // Expected output: 5
console.log(divide(5, 0));     // Expected output: "Error: Division by zero!"