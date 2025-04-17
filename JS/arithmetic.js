export function add(a, b) {
    return a + b;
  }
  
  export function subtract(a, b) {
    return a - b;
  }
  
  export function multiply(a, b) {
    return a * b;
  }
  
  export function divide(a, b) {
    if (b === 0) return "Error: can't divide by zero"; // Avoid division by zero
    return a / b;
  }
  