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

export function logarithm(x) {
  if (x <= 0) throw new Error("Input must be positive");
  return Math.log10(x);
}

export function naturalLogarithm(x) {
  if (x <= 0) throw new Error("Input must be positive");
  return Math.log(x);
}

export function double(x) {
  return x * 2;
}

export function triple(x) {
  return x * 3;
}

export function tetration(a, b) {
  if (!Number.isInteger(b) || b < 0) throw new Error("Tetration power must be non-negative integer");
  if (b > 5) throw new Error("Power too large (max 5)");
  if (a > 10 && b > 3) throw new Error("Result would be too large");

  let result = 1;
  for (let i = 0; i < b; i++) {
    result = Math.pow(a, result);
    if (!Number.isFinite(result)) throw new Error("Overflow");
    if (result > 1e100) throw new Error("Result too large");
  }
  return result;
}

export function superLog(x) {
  if (x <= 1) throw new Error("Input must be > 1");
  
  let count = 0;
  let current = x;
  
  while (current > 1.0001) {  
    current = Math.log(current);
    count++;
    if (count > 100) break;  
  }
  
  return count + (current - 1);  
}

export function primeFactorization(n) {
  if (!Number.isInteger(n) || n <= 1) throw new Error("Input must be integer > 1");
  
  const factors = [];
  let remaining = n;

  while (remaining % 2 === 0) {
    factors.push(2);
    remaining /= 2;
  }

  for (let i = 3; i <= Math.sqrt(remaining); i += 2) {
    while (remaining % i === 0) {
      factors.push(i);
      remaining /= i;
    }
  }

  if (remaining > 2) factors.push(remaining);
  
  return factors.join(" × "); 
}

export function calculateTip(amount) {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount)) throw new Error("Invalid input");
  if (numericAmount < 0) throw new Error("Negative amount");
  
  const preciseAmount = parseFloat(numericAmount.toFixed(2));
  
  const tip = preciseAmount * 0.15;
  
  const roundedTip = Math.ceil(tip);
  
  return parseFloat(roundedTip.toFixed(2));
}

export function halve(x) {
  return x / 2;
}

export function quarter(x) {
  return x / 4;
}

export function ceiling(x) {
  return Math.ceil(x);
}

export function floor(x) {
  return Math.floor(x);
}

export function round(x) {
  return Math.round(x);
}

// export function preciseRound(x, precision = 0) {
//   const factor = Math.pow(10, precision);
//   return Math.round(x * factor) / factor;
// }

export function absoluteValue(x) {
  return Math.abs(x);
}

// export function plusMinus(x) {
//   return -x;
// }