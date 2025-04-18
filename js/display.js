const displayWindow = document.getElementById("display-window");

function appendToDisplay(input) {
  displayWindow.value += input;
}

function clearDisplay() {
  displayWindow.value = "";
}

function calculate() {
  try {
    displayWindow.value = eval(displayWindow.value);
  } catch (error) {
    displayWindow.value = "Error";
  }
}
