document.addEventListener('DOMContentLoaded', () => {
    const timeDisplay = document.getElementById('timeDisplay');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const lapsList = document.getElementById('lapsList');

    let timer = null;
    let startTime = 0;
    let elapsedTime = 0;
    let isRunning = false;
    let laps = [];

    function start() {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            timer = setInterval(update, 10);
            isRunning = true;
            toggleButtons();
        }
    }

    function stop() {
        if (isRunning) {
            clearInterval(timer);
            elapsedTime = Date.now() - startTime;
            isRunning = false;
            toggleButtons();
        }
    }

    function reset() {
        stop();
        elapsedTime = 0;
        laps = [];
        timeDisplay.textContent = '00:00:00.00';
        lapsList.innerHTML = '';
        toggleButtons();
        resetBtn.disabled = true;
        lapBtn.disabled = true;
    }

    function lap() {
        if (isRunning) {
            const lapTime = Date.now() - startTime;
            laps.push(lapTime);
            renderLaps();
        }
    }

    function update() {
        const currentTime = Date.now();
        elapsedTime = currentTime - startTime;
        timeDisplay.textContent = formatTime(elapsedTime);
    }
    
    function formatTime(time) {
        const date = new Date(time);
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        const centiseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
        return `${minutes}:${seconds}.${centiseconds}`;
    }

    function renderLaps() {
        lapsList.innerHTML = '';
        laps.forEach((lap, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="lap-number">Lap ${index + 1}</span><span class="lap-time">${formatTime(lap)}</span>`;
            lapsList.prepend(li);
        });
    }

    function toggleButtons() {
        startBtn.style.display = isRunning ? 'none' : 'inline-block';
        stopBtn.style.display = isRunning ? 'inline-block' : 'none';
        lapBtn.disabled = !isRunning;
        resetBtn.disabled = elapsedTime === 0;
    }

    startBtn.addEventListener('click', start);
    stopBtn.addEventListener('click', stop);
    resetBtn.addEventListener('click', reset);
    lapBtn.addEventListener('click', lap);
});