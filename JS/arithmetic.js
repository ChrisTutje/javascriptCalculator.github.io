export function add(x, y) {
    return x + y;
  }
  
  export function subtract(x, y) {
    return x - y;
  }
  
  export function multiply(x, y) {
    return x * y;
  }
  
  export function divide(x, y) {
    if (y === 0) return "Error: can't divide by zero"; // Avoid division by zero
    return x / y;
  }
  