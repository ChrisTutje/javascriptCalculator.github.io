export function succession(x) {
  return x + 1;
}

export function predecession(x) {
  return x - 1;
}

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
  if (y === 0) throw new Error("Divide by zero");
  return x / y;
}

export function floorDivide(x, y) {
  if (y === 0) throw new Error("Divide by zero");
  return Math.floor(x / y);
}

export function modulo(x, y) {
  if (y === 0) throw new Error("Modulo by zero");
  return x % y;
}

export function factorial(x) {
  if (x < 0) throw new Error("Factorial of negative number");
  if (!Number.isInteger(x)) throw new Error("Factorial of non-integer");
  
  let result = 1;
  for (let i = 2; i <= x; i++) {
    result *= i;
  }
  return result;
}

export function permutation(x) {
  if (x < 0) throw new Error("Negative input");
  if (!Number.isInteger(x)) throw new Error("Non-integer input");
  let result = 0;
  for (let i = 1; i <= x; i++) {
    result += i;
  }
  return result;
}

export function subfactorial(x) {
  if (x < 0) throw new Error("Negative input");
  if (!Number.isInteger(x)) throw new Error("Non-integer input");
  let result = 0;
  for (let i = 1; i <= x; i++) {
    result = i - result;  
  }
  return result;
}

export function harmonicFactorial(x) {
  if (x < 0) throw new Error("Negative input");
  if (!Number.isInteger(x)) throw new Error("Non-integer input");
  if (x === 0) return 1;
  let result = 1;
  for (let i = 2; i <= x; i++) {
    result = result / i;
  }
  return result;
}

export function exponent(x, y) {
  return Math.pow(x, y);
}

export function reciprocal(x, y) {
  return Math.pow(x, -y);
}

export function square(x) {
  return x * x;
}

export function cube(x) {
  return x * x * x;
}

export function squareRoot(x) {
  if (x < 0) throw new Error("Negative number");
  return Math.sqrt(x);
}

export function cubeRoot(x) {
  return Math.cbrt(x); 
}

export function root(x, y) {
  if (x < 0 && y % 2 === 0) throw new Error("Even root of negative number");
  if (y === 0) throw new Error("Zero root undefined");
  return Math.pow(x, 1/y);
}

export function sine(x) {
  return Math.sin(x); 
}

export function cosine(x) {
  return Math.cos(x); 
}

export function tangent(x) {
  const result = Math.tan(x);
  if (!Number.isFinite(result)) throw new Error("Undefined tangent");
  return result;
}
