let timer;
let isWorkSession = true;
let minutes = 25;
let seconds = 0;

function updateDisplay() {
  const display = document.getElementById("timer");
  display.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  document.getElementById("sessionType").textContent = isWorkSession ? "Work Session" : "Break Time";
}

function startPomodoro() {
  if (timer) return; // Prevent multiple intervals

  timer = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        isWorkSession = !isWorkSession;
        minutes = isWorkSession ? 25 : 5;
        seconds = 0;
        updateDisplay();
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateDisplay();
  }, 1000);
}

function resetPomodoro() {
  clearInterval(timer);
  timer = null;
  isWorkSession = true;
  minutes = 25;
  seconds = 0;
  updateDisplay();
}

window.addEventListener("DOMContentLoaded", () => {
  updateDisplay();

  document.getElementById("startBtn").addEventListener("click", startPomodoro);
  document.getElementById("resetBtn").addEventListener("click", resetPomodoro);
});
