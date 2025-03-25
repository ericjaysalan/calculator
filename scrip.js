const screen = document.querySelector("#screen");
const buttonWrapper = document.querySelector("#button-wrapper");
const numbersToOperate = {
  clearScreenNext: false,
  firstNumber: null,
  secondNumber: null,
  operator: null,
  operatorSelected: false,
};

// Setters
const setFirstNumber = (number) => (numbersToOperate.firstNumber = number);

const setSecondNumber = (number) => (numbersToOperate.secondNumber = number);

const setOperator = (operator) => (numbersToOperate.operator = operator);

const setOperatorSelected = (bool) =>
  (numbersToOperate.operatorSelected = bool);

const setClearScreenNext = (bool) =>
  (numbersToOperate.clearScreenNext = Boolean(bool));

// Getters
const getFirstNumber = () => numbersToOperate.firstNumber;

const getSecondNumber = () => numbersToOperate.secondNumber;

const getOperator = () => numbersToOperate.operator;

const getOperatorSelected = () => numbersToOperate.operatorSelected;

const getClearScreenNext = () => numbersToOperate.clearScreenNext;

const getNumberOnScreen = () => screen.textContent;

// Screen-related
const clearScreen = () => {
  screen.textContent = "";
};
const appendToScreen = (buttonName) => {
  if (screen.textContent === "0") {
    screen.textContent = buttonName;
  } else {
    screen.textContent += buttonName;
  }
};

const displayResult = (result) => {
  clearScreen();
  appendToScreen(result);
};

const isOperator = (button) => button.classList.contains("operators");

const isEquals = (button) => button.classList.contains("equals");

const isClear = (button) => button.classList.contains("clear");

const isNumber = (button) => button.classList.contains("numbers");

const reset = () => {
  numbersToOperate.clearScreenNext = false;
  numbersToOperate.firstNumber = null;
  numbersToOperate.secondNumber = null;
  numbersToOperate.operator = null;
  numbersToOperate.operatorSelected = false;

  screen.textContent = "0";
};

const operate = () => {
  const num1 = Number(getFirstNumber());
  const num2 = Number(getSecondNumber());
  let result;

  switch (getOperator()) {
    case "+":
      result = num1 + num2;
      break;
    case "−":
      result = num1 - num2;
      break;
    case "×":
      result = num1 * num2;
      break;
    case "÷":
      result = num1 / num2;
      break;
  }

  displayResult(result);
  setFirstNumber(result);
  setSecondNumber(null);
  setClearScreenNext(true);
};

buttonWrapper.addEventListener("click", (clickEvent) => {
  const button = clickEvent.target;

  if (isNumber(button)) {
    if (getClearScreenNext()) {
      clearScreen();
      setClearScreenNext(false);
    }

    appendToScreen(button.textContent);
  } else if (isClear(button)) {
    clearScreen();
    reset();
  } else if (isEquals(button)) {
    if (getFirstNumber() !== null) setSecondNumber(screen.textContent);

    operate();
  } else if (isOperator(button)) {
    setOperatorSelected(true);
    setClearScreenNext(true);

    if (getFirstNumber() === null) {
      setFirstNumber(getNumberOnScreen());
    } else if (getSecondNumber() === null) {
      setSecondNumber(getNumberOnScreen());
    }

    setOperator(button.textContent);
  }
});
