import { E, PI, TAU, PHI, SQRT2, THETA } from './constants.js';
import { succession, predecession, add, subtract, multiply, divide,  floorDivide, modulo, factorial, permutation, subfactorial, harmonicFactorial, exponent, reciprocal, square, cube, squareRoot, cubeRoot, root, sine, cosine, tangent, logarithm, naturalLogarithm, double, triple, tetration, superLog, primeFactorization, halve, quarter  } from './arithmeticButtons.js'; 

let currentInput = '';
let previousValue = null;
let selectedOperation = null;
let previousSecondValue = null;

const operationDisplay = document.getElementById("operation-display");
const displayWindow = document.getElementById("display-window");

function updateDisplay(value) {
  displayWindow.value = value;
}

function updateOperationDisplay() { //UpdateOperationDisplay()
  if (selectedOperation) {
    const operator = 
    selectedOperation === succession ? 'SUCC' :
    selectedOperation === predecession ? 'PRED' :
    selectedOperation === add ? '+' :
    selectedOperation === subtract ? '-' :
    selectedOperation === multiply ? '×' :
    selectedOperation === divide ? '÷' :
    selectedOperation === floorDivide ? '//' :
    selectedOperation === modulo ? '%' :
    selectedOperation === factorial ? '!' :
    selectedOperation === permutation ? '+!' :
    selectedOperation === subfactorial ? '-!' :
    selectedOperation === harmonicFactorial ? '/!' : 
    selectedOperation === exponent ? '**' :
    selectedOperation === reciprocal ? '⁻¹' :
    selectedOperation === square ? '²' :
    selectedOperation === cube ? '³' : 
    selectedOperation === squareRoot ? '√' :
    selectedOperation === cubeRoot ? '∛' :
    selectedOperation === root ? 'root' : 
    selectedOperation === logarithm ? 'log' :
    selectedOperation === naturalLogarithm ? 'ln' :
    selectedOperation === double ? 'double' : 
    selectedOperation === triple ? 'triple' : 
    selectedOperation === tetration ? '↑↑' : 
    selectedOperation === superLog ? 'slog' : 
    selectedOperation === primeFactorization ? 'PF' : 
    selectedOperation === halve ? '½' : 
    selectedOperation === quarter ? '¼' : '' ;
    
    
    if (selectedOperation.length === 1) {
      operationDisplay.textContent = `${operator}(${previousValue || '0'})`;
    } 
    else {
      operationDisplay.textContent = previousValue !== null 
        ? `${previousValue} ${operator}`
        : '';
    }
  } else {
    operationDisplay.textContent = '';
  }
}

export function inputDigit(digit) {
  if (digit === '.') {
    if (currentInput === '') currentInput = '0.';
    else if (!currentInput.includes('.')) currentInput += '.';
  } else {
    currentInput += digit;
  }
  updateDisplay(currentInput);
  updateOperationDisplay();
}

export function inputConstant(constantValue) {
  currentInput = constantValue.toString();
  updateDisplay(currentInput);
}

export function clearDisplay() {
  currentInput = '';
  previousValue = null;
  selectedOperation = null;
  previousSecondValue = null;
  operationDisplay.textContent = '';
  updateDisplay('');
}

export function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput);
}

function chooseOperation(opFunc) {
  if (currentInput === '' && previousValue === null) return;
  
  if (currentInput !== '') {
    previousValue = parseFloat(currentInput);
    currentInput = ''; 
  }
  
  selectedOperation = opFunc;
  updateDisplay(''); 
  updateOperationDisplay(); 
}

function calculate() {  //Calculate()
  if (!selectedOperation) return;

  if (selectedOperation.length === 1) { //Unary Operations
    try {
      const inputValue = currentInput ? parseFloat(currentInput) : previousValue;
      if (isNaN(inputValue)) return;
      
      const result = selectedOperation(inputValue);
      operationDisplay.textContent = `${
        selectedOperation === succession ? 'SUCC' : 
        selectedOperation === predecession ? 'PRED' :
        selectedOperation === factorial ? 'factorial' :
        selectedOperation === permutation ? 'permutation' :
        selectedOperation === subfactorial ? 'subfactorial' :
        selectedOperation === harmonicFactorial ? 'harmonicFactorial' : 
        selectedOperation === exponent ? '**' :
        selectedOperation === reciprocal ? '⁻¹' :
        selectedOperation === square ? 'square' :
        selectedOperation === cube ? 'cube' : 
        selectedOperation === squareRoot ? '√' :
        selectedOperation === cubeRoot ? '∛' :
        selectedOperation === root ? 'root' : 
        selectedOperation === sine ? 'sin' :
        selectedOperation === cosine ? 'cos' :
        selectedOperation === tangent ? 'tan' : 
        selectedOperation === double ? '×2' : 
        selectedOperation === triple ? '×3' : 
        selectedOperation === primeFactorization ? 'PF' :
        selectedOperation === halve ? '½' :
        selectedOperation === quarter ? '¼' : ''
      }(${inputValue}) =`;
      updateDisplay(result);
      currentInput = result.toString();
      previousValue = result;
    } catch (err) {
      handleError(err);
    }
    return;
  }

  if (previousValue === null && currentInput) {
    previousValue = parseFloat(currentInput);
    currentInput = '';
    return;
  }

  const secondValue = currentInput ? parseFloat(currentInput) : previousSecondValue;
  if (!secondValue && secondValue !== 0) return;

  try {
    const result = selectedOperation(previousValue, secondValue);
    
    if (currentInput) {
      previousSecondValue = parseFloat(currentInput);
    }
    
    operationDisplay.textContent = `${previousValue} ${  //Operation Display
      selectedOperation === add ? '+' :
      selectedOperation === subtract ? '-' :
      selectedOperation === multiply ? '×' :
      selectedOperation === divide ? '÷' :
      selectedOperation === floorDivide ? '//' :
      selectedOperation === modulo ? '%' : 
      selectedOperation === sine ? 'sin' :
      selectedOperation === cosine ? 'cos' :
      selectedOperation === tangent ? 'tan' : ''
    } ${secondValue} =`;
    
    updateDisplay(result);
    previousValue = result;
    currentInput = '';
  } catch (err) {
    handleError(err);
  }
}

export function toggleNegative() {
  if (currentInput === '') return;
  currentInput = currentInput.startsWith('-') 
    ? currentInput.substring(1) 
    : '-' + currentInput;
  updateDisplay(currentInput);
}

document.getElementById('keys').addEventListener('click', (event) => { //Click Handler
  const button = event.target.closest('button');
  if (!button) return;

  if (button.classList.contains('digit-btn')) {
    inputDigit(button.textContent);
  }
  else if (button.classList.contains('constant-btn')) {
    switch (button.textContent) {
      case 'e': inputConstant(E); break;
      case 'π': inputConstant(PI); break;
      case 'τ': inputConstant(TAU); break;
      case 'φ': inputConstant(PHI); break;
      case '√2': inputConstant(SQRT2); break;
      case 'θ': inputConstant(THETA); break;
    }
  }
  else if (button.classList.contains('operation-btn')) {
    switch (button.textContent) {
      case 'SUCC': chooseOperation(succession); break;
      case 'PRED': chooseOperation(predecession); break;
      case '+': chooseOperation(add); break;
      case '-': chooseOperation(subtract); break;
      case '*': chooseOperation(multiply); break;
      case '/': chooseOperation(divide); break;
      case '//': chooseOperation(floorDivide); break;
      case '%': chooseOperation(modulo); break;
      case '!': chooseOperation(factorial); break;
      case '+!': chooseOperation(permutation); break;
      case '-!': chooseOperation(subfactorial); break;
      case '/!': chooseOperation(harmonicFactorial); break;
      case '**': chooseOperation(exponent); break;
      case '⁻¹': chooseOperation(reciprocal); break;
      case '²': chooseOperation(square); break;
      case '³': chooseOperation(cube); break;
      case '√': chooseOperation(squareRoot); break;
      case '∛': chooseOperation(cubeRoot); break;
      case '√x': chooseOperation(root); break;
      case 'sin': chooseOperation(sine); break;
      case 'cos': chooseOperation(cosine); break;
      case 'tan': chooseOperation(tangent); break;
      case 'log': chooseOperation(logarithm); break;
      case 'ln': chooseOperation(naturalLogarithm); break;
      case '×2': chooseOperation(double); break;
      case '×3': chooseOperation(triple); break;
      case '↑↑': chooseOperation(tetration); break;
      case 'slog': chooseOperation(superLog); break;
      case 'PF': chooseOperation(primeFactorization); break;
      case '½': chooseOperation(halve); break;
      case '¼': chooseOperation(quarter); break;
      case '=': calculate(); break;
    }
  }
  else if (button.title === 'Clear') {
    clearDisplay();
  }
  else if (button.title === 'Delete') {
    deleteLast();
  }
  else if (button.textContent === '(-)') {
    toggleNegative();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') inputDigit(e.key);
  else if (e.key === '.') inputDigit('.');
  else if (e.key === 'Enter') calculate();
  else if (e.key === 'Escape') clearDisplay();
  else if (e.key === 'Backspace') deleteLast();
  else if (e.key === '+') chooseOperation(add);
  else if (e.key === '-') chooseOperation(subtract);
  else if (e.key === '*') chooseOperation(multiply);
  else if (e.key === '/') chooseOperation(divide);
});