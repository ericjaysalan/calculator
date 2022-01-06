const equation = document.querySelector('.equation');
const display = document.querySelector('.display');
const buttons = Array.from(document.getElementsByTagName('button'));
const numberButtons = Array.from(document.getElementsByClassName('numbers'));
const operatorButtons = Array.from(document.getElementsByClassName('operator'));

// TODO show result when doing more than a pair of operands
// TODO add error message when user tries to divide by zero
// TODO add backspace button to delete wrong number
// TODO add keyboard support

// All the user input will be in an array, which will be evaluated whenever it has 3 elements.
// Those 3 elements would be operand1, operator, and operand2
let input = [];
let dotInDisplay = false;

const add = () => input[0] + input[2];

const subtract = () => input[0] - input[2];

const multiply = () => input[0] * input[2];

const divide = () => input[0] / input[2];

const roundable = (floatNum) => {
  floatNum = floatNum.toString();
  let indexOfDot = floatNum.indexOf('.');
  let lengthAfterDot = floatNum.slice(indexOfDot + 1).length;

  if (lengthAfterDot > 5) return true;
  else return false;
};

function operate() {
  let operator = input[1];
  switch (operator) {
    case '+':
      input.splice(0, 3, add());
      break;
    case '-':
      input.splice(0, 3, subtract());
      break;
    case 'x':
      input.splice(0, 3, multiply());
      break;
    case '÷':
      input.splice(0, 3, divide());
      break;
    default:
      console.warn("You're pressing equals, aren't you?");
  }

  if (roundable(input[0])) {
    input[0] = Number(input[0].toFixed(6));
  }
}

const appendToDisplay = (inputString) => (display.innerText += inputString);

const isEqualsButton = (innerText) => innerText.includes('=');

const clearDisplay = () => (display.innerText = '');

const checkInput = (input) => !isNaN(Number(input));

const displayIsNotEmpty = () => display.innerText;

const displayEquation = () => (equation.innerText = input.join(' '));

const setDisplay = (str) => (display.innerText = str);

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
  input = [];
  display.innerText = '';
  equation.innerText = '';
}

function displayInput(e) {
  let displayText = display.innerText;
  const button = e.target;
  const className = button.className;
  const buttonText = button.innerText;

  if (className.includes('dot')) {
    if (dotInDisplay) {
      return;
    } else {
      dotInDisplay = true;
      appendToDisplay(buttonText);
    }
  } else if (className.includes('clear')) clear();
  else if (className.includes('operator')) {
    if (displayIsNotEmpty() && checkInput(displayText)) {
      input.push(Number(displayText));
      clearDisplay();

      if (buttonText === '=') {
        operate();
        setDisplay(input[0]);
        input.splice(0, 1);
      } else if (input.length === 3) {
        operate();
        clearDisplay();
        input.push(buttonText);
      } else {
        input.push(buttonText);
      }
      dotInDisplay = false;
    } else if (lastButtonArithmetic()) {
      input.splice(input.length - 1, 1, buttonText);
    }
  } else if (className.includes('number')) {
    appendToDisplay(buttonText);
  }
}

buttons.forEach((button) => addEventListener('click', displayInput));
