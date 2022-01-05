const equation = document.querySelector('.equation');
const display = document.querySelector('.display');
const buttons = Array.from(document.getElementsByTagName('button'));
const numberButtons = Array.from(document.getElementsByClassName('numbers'));
const operatorButtons = Array.from(document.getElementsByClassName('operator'));

// equation.innerText = '1';
let input = {};
let operatorClicked = false;

function operate(input) {
  let result;

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

  return result;
}

const add = (input) => input.operand1 + input.operand2;

const subtract = (input) => input.operand1 - input.operand2;

const multiply = (input) => input.operand1 * input.operand2;

const divide = (input) => input.operand1 / input.operand2;

const appendInput = (inputString) => (display.innerText += inputString);

const isEqualsButton = (innerText) => innerText.includes('=');

const clearDisplay = () => (display.innerText = '');

const checkInput = (input) => {
  return 'operand1' in input && 'operator' in input && 'operand2' in input;
};

const displayIsNotEmpty = () => display.innerText;

function deleteInputProperties(input) {
  delete input.operand1;
  delete input.operand2;
  delete input.operator;
}

function displayEquation(input, equals = false) {
  if (equals) {
    equation.innerText = `${input.operand1} ${input.operator} ${input.operand2}`;
  } else {
    equation.innerText = input.operand1;
  }
}

function displayInput(e) {
  const target = e.target;
  const className = target.className;

  if (className.includes('clear')) {
    display.innerText = '';
    equation.innerText = '';
    deleteInputProperties(input);
  } else if (className.includes('operator')) {
    operatorClicked = true;

    switch (target.innerText) {
      case '=':
        if ('operand1' in input && displayIsNotEmpty()) {
          input.operand2 = Number(display.innerText);

          if (checkInput(input)) {
            display.innerText = operate(input);
            displayEquation(input, true);
          }
        }
        break;
      case '+':
      case '-':
      case 'x':
      case '÷':
        input.operator = target.innerText;
      default:
        if (displayIsNotEmpty()) {
          input.operand1 = Number(display.innerText);
          displayEquation(input);

          clearDisplay();
        }
        break;
    }
  } else if (className.includes('number')) {
    appendInput(target.innerText);
  }
}

/* let input = '3 / 2';
input = input.split(' ');
input = {
  operand1: Number(input[0]),
  operator: input[1],
  operand2: Number(input[2]),
}; */

buttons.forEach((button) => addEventListener('click', displayInput));
