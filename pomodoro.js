let timer;
let isWorkSession = true;
let minutes = 25;
let seconds = 0;

// Load saved state if exists
window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("pomodoroState"));
  if (saved) {
    minutes = saved.minutes;
    seconds = saved.seconds;
    isWorkSession = saved.isWorkSession;
  }

  updateDisplay();

  document.getElementById("startBtn").addEventListener("click", startPomodoro);
  document.getElementById("resetBtn").addEventListener("click", resetPomodoro);
});

function updateDisplay() {
  const display = document.getElementById("timer");
  display.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  document.getElementById("sessionType").textContent = isWorkSession ? "Work Session" : "Break Time";
}

function saveState() {
  const state = {
    minutes,
    seconds,
    isWorkSession
  };
  localStorage.setItem("pomodoroState", JSON.stringify(state));
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
        saveState();
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }

    updateDisplay();
    saveState();
  }, 1000);
}

function resetPomodoro() {
  clearInterval(timer);
  timer = null;
  isWorkSession = true;
  minutes = 25;
  seconds = 0;
  updateDisplay();
  localStorage.removeItem("pomodoroState");
}
