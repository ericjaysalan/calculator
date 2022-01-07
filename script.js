// TODO add error message when user tries to divide by zero
// TODO add backspace button to delete wrong number
// TODO add keyboard support
const equation = document.querySelector('.equation');
const display = document.querySelector('.display');
const buttons = Array.from(document.getElementsByTagName('button'));
const numberButtons = Array.from(document.getElementsByClassName('numbers'));
const operatorButtons = Array.from(document.getElementsByClassName('operator'));
const clearButton = document.querySelector('.clear');

let input = {
  hasDot: false,
  setDot: function (bool) {
    this.hasDot = bool;
  },
};
let displayObj = {
  lastButtonWasOperator: false,
  operatorAndFirstOperand: false,
};
let dotInDisplay = false;

const add = () => input.operand1 + input.operand2;

const subtract = () => input.operand1 - input.operand2;

const multiply = () => input.operand1 * input.operand2;

const divide = () => input.operand1 / input.operand2;

/* const roundable = (floatNum) => {
  floatNum = floatNum.toString();
  let indexOfDot = floatNum.indexOf('.');
  let lengthAfterDot = floatNum.slice(indexOfDot + 1).length;

  if (lengthAfterDot > 5) return true;
  else return false;
}; */

function operate() {
  if (!'operand1' in input && !'operator' in input && !'operand2' in input) return;
  switch (input.operator) {
    case '+':
      input.result = add();
      break;
    case '-':
      input.result = subtract();
      break;
    case 'x':
      input.result = multiply();
      break;
    case '÷':
      input.result = divide();
      break;
    default:
      warn('invalid operator');
  }

  delete input.operand1;
  delete input.operand2;
  delete input.operator;
  /* if (roundable(input[0])) {
    input[0] = Number(input[0].toFixed(6));
  } */
}

const appendToDisplay = (str) => (display.innerText += str);

const clearDisplay = () => (display.innerText = '');

const checkInput = (input) => !isNaN(Number(input));

const displayIsEmpty = () => display.innerText === '';

const lastButtonArithmetic = () => {
  let lastElement = input[input.length - 1];
  switch (lastElement) {
    case '+':
    case '-':
    case 'x':
    case '÷':
      return true;
    default:
      return false;
  }
};

function clear() {
  input = {
    hasDot: false,
    setDot: function (bool) {
      this.hasDot = bool;
    },
  };
  displayObj = {
    lastButtonWasOperator: false,
    operatorAndFirstOperand: false,
  };
  clearDisplay();
}

function evaluateOperator(button, displayText) {
  let buttonText = button.innerText;

  if (buttonText === '=') {
    if (displayObj.lastButtonWasOperator) return;

    if ('operand1' in input && 'operator' in input) {
      input.operand2 = Number(displayText);
      operate();

      display.innerText = input.result;
      delete input.result;
      console.log(input);
    } else {
    }
  } else {
    if ('operand1' in input && 'operator' in input) {
      if (displayObj.lastButtonWasOperator) {
        input.operator = buttonText;
        console.log(input);
        return;
      } else {
        input.operand2 = Number(displayText);
        operate();

        display.innerText = input.result;
        input.operand1 = input.result;
        input.operator = button.innerText;
        delete input.result;

        displayObj.operatorAndFirstOperand = true;
      }
    } else {
      input.operand1 = Number(display.innerText);
      input.operator = button.innerText;
      displayObj.operatorAndFirstOperand = true;
    }
    displayObj.lastButtonWasOperator = true;
    console.log(input);
  }
}

function clickEventHandler(e) {
  let displayText = display.innerText;
  const button = e.target;
  const className = button.className;
  const buttonText = button.innerText;

  switch (className) {
    case 'numbers':
      displayObj.lastButtonWasOperator = false;
      if (displayObj.operatorAndFirstOperand) {
        displayObj.operatorAndFirstOperand = false;
        clearDisplay();
        appendToDisplay(buttonText);
      } else appendToDisplay(buttonText);

      break;
    case 'clear':
      clear();
      break;
    case 'dot':
      if (input.hasDot) return;
      input.setDot(true);
      appendToDisplay(buttonText);
      break;
    case 'operators':
      input.setDot(false);

      evaluateOperator(button, displayText);
      break;
    default:
      console.log('wut?');
  }
}

buttons.forEach((button) => button.addEventListener('click', clickEventHandler));
