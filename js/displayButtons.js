import { succession, predecession, add, subtract, multiply, divide } from './arithmeticButtons.js';

let currentInput = '';
let previousValue = null;
let selectedOperation = null;
let previousSecondValue = null;

const operationDisplay = document.getElementById("operation-display");
const displayWindow = document.getElementById("display-window");

function updateDisplay(value) {
  displayWindow.value = value;
}

function updateOperationDisplay() {
  if (selectedOperation) {
    const operator = 
      selectedOperation === succession ? 'SUCC' :
      selectedOperation === predecession ? 'PRED' :
      selectedOperation === add ? '+' :
      selectedOperation === subtract ? '-' :
      selectedOperation === multiply ? '×' :
      selectedOperation === divide ? '÷' : '';
    
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
  
  // If we have new input, store it as previousValue
  if (currentInput !== '') {
    previousValue = parseFloat(currentInput);
    currentInput = ''; // Clear current input after storing
  }
  
  selectedOperation = opFunc;
  updateDisplay(''); // Clear the main display
  updateOperationDisplay(); // Update the operation display
}

function calculate() {
  if (!selectedOperation) return;

  if (selectedOperation.length === 1) {
    try {
      const inputValue = currentInput ? parseFloat(currentInput) : previousValue;
      if (isNaN(inputValue)) return;
      
      const result = selectedOperation(inputValue);
      operationDisplay.textContent = `${
        selectedOperation === succession ? 'SUCC' : 'PRED'
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
    
    operationDisplay.textContent = `${previousValue} ${
      selectedOperation === add ? '+' :
      selectedOperation === subtract ? '-' :
      selectedOperation === multiply ? '×' :
      selectedOperation === divide ? '÷' : ''
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

document.getElementById('keys').addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  if (button.classList.contains('digit-btn')) {
    inputDigit(button.textContent);
  }
  else if (button.classList.contains('operation-btn')) {
    switch (button.textContent) {
      case '+': chooseOperation(add); break;
      case '-': chooseOperation(subtract); break;
      case '*': chooseOperation(multiply); break;
      case '/': chooseOperation(divide); break;
      case 'SUCC': chooseOperation(succession); break;
      case 'PRED': chooseOperation(predecession); break;
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