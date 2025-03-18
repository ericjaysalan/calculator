const screen = document.querySelector("#screen");
const buttonWrapper = document.querySelector("#button-wrapper");

let currentNumber = 0;
let previousNumber = 0;

const clearScreen = () => {
  screen.textContent = "0";
};

const showOnScreen = (buttonName) => {
  if (screen.textContent === "0") {
    screen.textContent = buttonName;
  } else {
    screen.textContent += buttonName;
  }
};

buttonWrapper.addEventListener("click", (clickEvent) => {
  const button = clickEvent.target;

  if (
    button.classList.contains("numbers") ||
    button.classList.contains("operators")
  ) {
    showOnScreen(button.textContent);
  } else if (button.classList.contains("clear")) {
    clearScreen();
  }
});
