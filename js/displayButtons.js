import { succession, add, subtract, multiply, divide } from './arithmeticButtons.js';

let currentInput = '';
let previousValue = null;
let selectedOperation = null;

const operationDisplay = document.getElementById("operation-display");
const displayWindow = document.getElementById("display-window");

function updateDisplay(value) {
  displayWindow.value = value;
}

function updateOperationDisplay() {
  if (selectedOperation) {
    const operator = 
      selectedOperation === succession ? 'SUCC' :
      selectedOperation === add ? '+' :
      selectedOperation === subtract ? '-' :
      selectedOperation === multiply ? '×' :
      selectedOperation === divide ? '÷' : '';
    
    if (selectedOperation.length === 1) {
      const displayValue = previousValue !== null ? previousValue : currentInput || '0';
      operationDisplay.textContent = `${operator}(${displayValue})`;
    } 
    else {
      if (previousValue !== null) {
        operationDisplay.textContent = `${previousValue} ${operator}`;
      }
    }
  } else {
    operationDisplay.textContent = '';
  }
}

export function inputDigit(digit) {
  if (digit === '.' && currentInput.includes('.')) return;
  currentInput += digit;
  updateDisplay(currentInput);
  updateOperationDisplay();
}

function clearDisplay() {
  currentInput = '';
  previousValue = null;
  selectedOperation = null;
  operationDisplay.textContent = '';
  updateDisplay('');
}

export function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput);
}

function chooseOperation(opFunc) {
  if (currentInput === '') return;
  previousValue = parseFloat(currentInput);
  selectedOperation = opFunc;
  currentInput = '';
  updateOperationDisplay();
  updateDisplay('');
}

function calculate() {
  if (selectedOperation) {
    try {
      let result;
      const currentValue = parseFloat(currentInput);
      
      // Handle unary operations (like succession)
      if (selectedOperation.length === 1) {
        result = selectedOperation(previousValue || currentValue);
        operationDisplay.textContent = `${selectedOperation === succession ? 'SUCC' : ''}(${previousValue || currentValue}) =`;
      } 
      // Handle binary operations
      else {
        if (isNaN(previousValue)) return;
        result = selectedOperation(previousValue, currentValue);
        operationDisplay.textContent = `${previousValue} ${
          selectedOperation === add ? '+' :
          selectedOperation === subtract ? '-' :
          selectedOperation === multiply ? '×' :
          '÷'
        } ${currentValue} =`;
      }
      
      updateDisplay(result);
      currentInput = result.toString();
      previousValue = null;
      selectedOperation = null;
    } catch (err) {
      console.error("Calculation error:", err);
      operationDisplay.textContent = '';
      updateDisplay("Error");
      currentInput = '';
    }
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