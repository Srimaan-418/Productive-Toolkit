// script.js (Homepage)

document.addEventListener('DOMContentLoaded', () => {
    const continueBtn = document.getElementById('continueBtn');
    
    // Check if any data exists in localStorage
    const tasks = localStorage.getItem('zenith-tasks');
    const sessions = localStorage.getItem('zenith-sessionCount');
    const bmi = localStorage.getItem('zenith-lastBMI');

    // If no data exists, disable the "Continue" button
    if (!tasks && !sessions && !bmi) {
        continueBtn.disabled = true;
        continueBtn.style.opacity = '0.5';
        continueBtn.style.cursor = 'not-allowed';
        continueBtn.title = 'No saved data found';
    }
});

function continuePrevious() {
    // --- Load real data from localStorage ---

    // 1. Get pending tasks
    const tasks = JSON.parse(localStorage.getItem('zenith-tasks')) || [];
    const pendingTasks = tasks.filter(task => !task.completed).length;

    // 2. Get Pomodoro sessions
    const totalSessions = localStorage.getItem('zenith-sessionCount') || 0;

    // 3. Get last BMI
    const lastBMI = localStorage.getItem('zenith-lastBMI') || '--';

    // --- Update the display with real data ---
    document.getElementById("pendingTasks").textContent = pendingTasks;
    document.getElementById("totalSessions").textContent = totalSessions;
    document.getElementById("lastBMI").textContent = lastBMI;

    // --- Show the continue section ---
    document.getElementById("continueSection").style.display = "block";
    document.querySelector('.hero-actions').style.display = 'none';
}

function startFresh() {
    showDashboard();
}

function enterDashboard() {
    showDashboard();
}

function showDashboard() {
    document.getElementById('homepage').style.display = 'none';
    const dashboard = document.getElementById('dashboard');
    dashboard.style.display = 'block';
    dashboard.classList.add('active');
}