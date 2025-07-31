document.addEventListener('DOMContentLoaded', () => {
    // --- Element References ---
    const timeDisplay = document.getElementById('timeDisplay');
    const progressCircle = document.getElementById('progressCircle');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const modeButtons = document.querySelectorAll('.mode-btn');
    const sessionCountDisplay = document.getElementById('sessionCount');
    const alertSound = document.getElementById('alertSound');
    const workTimeInput = document.getElementById('workTime');
    const shortBreakTimeInput = document.getElementById('shortBreakTime');
    const longBreakTimeInput = document.getElementById('longBreakTime');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    const settingsSavedMsg = document.getElementById('settings-saved-msg');

    // --- State Variables ---
    let settings = JSON.parse(localStorage.getItem('zenith-pomodoro-settings')) || {
        work: 25,
        shortBreak: 5,
        longBreak: 15,
    };
    
    let MODES = {
        work: { time: settings.work * 60, name: 'work' },
        shortBreak: { time: settings.shortBreak * 60, name: 'shortBreak' },
        longBreak: { time: settings.longBreak * 60, name: 'longBreak' },
    };

    let timer;
    let currentMode = MODES.work;
    let timeLeft = currentMode.time;
    let isPaused = true;
    let sessionCount = parseInt(localStorage.getItem('zenith-sessionCount')) || 0;

    // --- Functions ---
    const updateDisplay = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const progress = ((currentMode.time - timeLeft) / currentMode.time) * 360;
        progressCircle.style.background = `conic-gradient(var(--accent) ${progress}deg, transparent ${progress}deg)`;
    };

    const switchMode = (modeName) => {
        clearInterval(timer);
        currentMode = MODES[modeName];
        timeLeft = currentMode.time;
        isPaused = true;
        
        modeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === modeName);
        });
        
        startBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
        
        updateDisplay();
    };

    const startTimer = () => {
        if (isPaused) {
            isPaused = false;
            startBtn.style.display = 'none';
            pauseBtn.style.display = 'inline-block';

            timer = setInterval(() => {
                timeLeft--;
                updateDisplay();

                if (timeLeft <= 0) {
                    clearInterval(timer);
                    alertSound.play();
                    
                    if (currentMode.name === 'work') {
                        sessionCount++;
                        localStorage.setItem('zenith-sessionCount', sessionCount);
                        sessionCountDisplay.textContent = sessionCount;
                        if (sessionCount % 4 === 0) {
                            switchMode('longBreak');
                        } else {
                            switchMode('shortBreak');
                        }
                    } else {
                        switchMode('work');
                    }
                }
            }, 1000);
        }
    };

    const pauseTimer = () => {
        isPaused = true;
        clearInterval(timer);
        startBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
    };

    const resetTimer = () => {
        pauseTimer();
        timeLeft = currentMode.time;
        updateDisplay();
    };
    
    const loadSettings = () => {
        workTimeInput.value = settings.work;
        shortBreakTimeInput.value = settings.shortBreak;
        longBreakTimeInput.value = settings.longBreak;
    };
    
    const saveSettings = () => {
        settings.work = workTimeInput.value;
        settings.shortBreak = shortBreakTimeInput.value;
        settings.longBreak = longBreakTimeInput.value;
        
        localStorage.setItem('zenith-pomodoro-settings', JSON.stringify(settings));
        
        MODES = {
            work: { time: settings.work * 60, name: 'work' },
            shortBreak: { time: settings.shortBreak * 60, name: 'shortBreak' },
            longBreak: { time: settings.longBreak * 60, name: 'longBreak' },
        };
        
        switchMode(currentMode.name); // Reset to apply new settings
        
        // Show saved message
        settingsSavedMsg.style.opacity = 1;
        setTimeout(() => {
            settingsSavedMsg.style.opacity = 0;
        }, 2000);
    };

    // --- Event Listeners ---
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    saveSettingsBtn.addEventListener('click', saveSettings);
    modeButtons.forEach(button => {
        button.addEventListener('click', () => switchMode(button.dataset.mode));
    });

    // --- Initial Load ---
    loadSettings();
    sessionCountDisplay.textContent = sessionCount;
    updateDisplay();
});