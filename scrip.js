const screen = document.querySelector("#screen");
const buttonWrapper = document.querySelector("#button-wrapper");

buttonWrapper.addEventListener("click", (clickEvent) => {
  const button = clickEvent.target;

  if (
    button.classList.contains("numbers") ||
    button.classList.contains("operators")
  ) {
    screen.textContent += button.textContent;
  }
});
