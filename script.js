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

const isDot = (button) => button.classList.contains("dot");

const reset = () => {
  numbersToOperate.clearScreenNext = false;
  numbersToOperate.firstNumber = null;
  numbersToOperate.secondNumber = null;
  numbersToOperate.operator = null;
  numbersToOperate.operatorSelected = false;

  screen.textContent = "0";
};

const highlightOperatorBtn = (btn) => {
  const highlight = "highlight";

  if (btn.classList.contains(highlight)) btn.classList.remove(highlight);
  else btn.classList.add(highlight);
};

const roundTo2 = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

const hasDot = (screenText) => !screen.textContent.includes(".");

const operate = () => {
  const num1 = Number(getFirstNumber());
  const num2 = Number(getSecondNumber());
  let result;

  switch (getOperator().textContent) {
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

  if (!Number.isInteger(result)) result = roundTo2(result);
  displayResult(result);
  setFirstNumber(result);
  setSecondNumber(null);
  setClearScreenNext(true);
  setOperatorSelected(false);
  highlightOperatorBtn(getOperator());
};

buttonWrapper.addEventListener("click", (clickEvent) => {
  const button = clickEvent.target;

  if (isDot(button)) {
    if (hasDot(screen.textContent)) {
      if (screen.textContent === "0") {
        appendToScreen("0.");
      } else appendToScreen(".");
    } else if (getOperatorSelected()) {
      clearScreen();
      appendToScreen("0.");
    }
  } else if (isNumber(button)) {
    if (getClearScreenNext()) {
      clearScreen();
      setClearScreenNext(false);
    }

    appendToScreen(button.textContent);
  } else if (isClear(button)) {
    clearScreen();
    reset();
  } else if (isEquals(button)) {
    if (getFirstNumber() !== null && getOperatorSelected()) {
      setSecondNumber(getNumberOnScreen());
      operate();

      setOperator(null);
      setOperatorSelected(false);
      console.log(numbersToOperate);
    }
  } else if (isOperator(button)) {
    // TODO Fix bug where operators can be clicked first.
    highlightOperatorBtn(button);

    if (getFirstNumber() === null && getSecondNumber() === null) {
      setFirstNumber(getNumberOnScreen());

      setOperatorSelected(true);
      setOperator(button);

      setClearScreenNext(true);
    } else if (getOperatorSelected()) {
      setSecondNumber(getNumberOnScreen());

      operate();

      setOperator(button);

      console.log(numbersToOperate);
    } else {
      setOperator(button);
      setOperatorSelected(true);

      setClearScreenNext(true);
    }
  }
});
