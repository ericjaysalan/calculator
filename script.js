const equation = document.querySelector('.equation');
const display = document.querySelector('.display');
const buttons = Array.from(document.getElementsByTagName('button'));
const numberButtons = Array.from(document.getElementsByClassName('numbers'));
const operatorButtons = Array.from(document.getElementsByClassName('operator'));

let input = [];

const add = (input) => input.operand1 + input.operand2;

const subtract = (input) => input.operand1 - input.operand2;

const multiply = (input) => input.operand1 * input.operand2;

const divide = (input) => input.operand1 / input.operand2;

function operate(arr) {
  let result;
  let input = {
    operand1: -1,
    operator: '',
    operand2: -1,
  };

  for (let i = 0; i < arr.length; ) {
    if (arr.length === 1) break;

    input.operand1 = arr[i];
    input.operator = arr[i + 1];
    input.operand2 = arr[i + 2];

    switch (input.operator) {
      case '+':
        result = add(input);
        break;
      case '-':
        result = subtract(input);
        break;
      case 'x':
        result = multiply(input);
        break;
      case '÷':
        result = divide(input);
        break;
      default:
        console.warn('Operator not found.');
    }

    arr.splice(0, 3, result);
  }

  return arr[0];
}

const appendInput = (inputString) => (display.innerText += inputString);

const isEqualsButton = (innerText) => innerText.includes('=');

const clearDisplay = () => (display.innerText = '');

const checkInput = (input) => !isNaN(Number(input));

const displayIsNotEmpty = () => display.innerText;

const displayEquation = (input) => (equation.innerText = input.join(' '));

function clear() {
  input = [];
  display.innerText = '';
  equation.innerText = '';
}

function displayInput(e) {
  let displayText = display.innerText;
  const target = e.target;
  const className = target.className;

  if (className.includes('clear')) clear();
  else if (className.includes('operator')) {
    if (displayIsNotEmpty() && checkInput(displayText)) {
      switch (target.innerText) {
        case '=':
          input.push(Number(display.innerText));
          display.innerText = operate(input);

          break;
        case '+':
        case '-':
        case 'x':
        case '÷':
        default:
          input.push(Number(displayText));
          input.push(target.innerText);

          clearDisplay();
          break;
      }
    }
    displayEquation(input);
  } else if (className.includes('number')) {
    appendInput(target.innerText);
  }
}

buttons.forEach((button) => addEventListener('click', displayInput));
