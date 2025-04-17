// buttons.js

export function clear() {
    return {
      currentOperand: '',
      previousOperand: '',
      operation: undefined
    };
  }
  
  export function deleteCharacter(currentOperand) {
    return currentOperand.toString().slice(0, -1);
  }
  