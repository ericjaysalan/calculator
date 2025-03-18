const screen = document.querySelector("#screen");
const buttonWrapper = document.querySelector("#button-wrapper");

const numbersToOperate = {
  inputDone: false,
  firstNumber: null,
  secondNumber: null,
  operator: null,
  operatorSelected: false,
};

const clearScreen = () => {
  screen.textContent = "0";
};

const showOnScreen = (buttonName) => {
  if (screen.textContent === "0") {
    screen.textContent = buttonName;
  } else if (numbersToOperate.inputDone) {
    clearScreen();
    screen.textContent = buttonName;
    numbersToOperate.inputDone = false;
  } else {
    screen.textContent += buttonName;
  }
};

const process = (currentNumber, operator) => {
  numbersToOperate.operatorSelected = true;
  numbersToOperate.operator = operator;

  if (numbersToOperate.firstNumber === null) {
    numbersToOperate.firstNumber = currentNumber;
    numbersToOperate.inputDone = true;
  } else if (numbersToOperate.secondNumber === null) {
    numbersToOperate.secondNumber = currentNumber;
    numbersToOperate.inputDone = true;
    alert(operate);
  }

  console.log(numbersToOperate);
};

buttonWrapper.addEventListener("click", (clickEvent) => {
  const button = clickEvent.target;

  if (button.classList.contains("numbers")) {
    showOnScreen(button.textContent);
  } else if (button.classList.contains("clear")) {
    clearScreen();
  } else if (button.classList.contains("operators")) {
    process(screen.textContent, button.textContent);
  }
});
