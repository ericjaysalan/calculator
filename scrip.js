const screen = document.querySelector("#screen");
const buttonWrapper = document.querySelector("#button-wrapper");

const showOnScreen = (buttonName) => {
  screen.textContent += buttonName;
};

buttonWrapper.addEventListener("click", (clickEvent) => {
  const button = clickEvent.target;

  if (
    button.classList.contains("numbers") ||
    button.classList.contains("operators")
  ) {
    showOnScreen(button.textContent);
  }
});
