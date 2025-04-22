import { add, subtract, multiply, divide } from './arithmeticButtons.js';

let currentInput = '';
let previousValue = null;
let selectedOperation = null;

const operationDisplay = document.getElementById("operation-display");
const displayWindow = document.getElementById("display-window");

function updateDisplay(value) {
  displayWindow.value = value;
}

function updateOperationDisplay() {
  if (previousValue !== null && selectedOperation) {
    const operator = 
      selectedOperation === add ? '+' :
      selectedOperation === subtract ? '-' :
      selectedOperation === multiply ? '×' :
      selectedOperation === divide ? '÷' : '';
    
    operationDisplay.textContent = `${previousValue} ${operator}`;
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
  const secondValue = parseFloat(currentInput);
  if (selectedOperation && !isNaN(previousValue) && !isNaN(secondValue)) {
    try {
      const result = selectedOperation(previousValue, secondValue);
      operationDisplay.textContent = `${previousValue} ${
        selectedOperation === add ? '+' :
        selectedOperation === subtract ? '-' :
        selectedOperation === multiply ? '×' :
        '÷'
      } ${secondValue} =`;
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