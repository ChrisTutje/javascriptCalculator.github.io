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
