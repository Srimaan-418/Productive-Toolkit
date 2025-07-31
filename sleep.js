document.addEventListener('DOMContentLoaded', () => {
    const sleepForm = document.getElementById('sleepForm');
    const logList = document.getElementById('logList');
    
    // Set default date to today
    document.getElementById('sleepDate').value = new Date().toISOString().split('T')[0];

    // Load existing logs from localStorage when the page opens
    loadLogs();

    sleepForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const date = document.getElementById('sleepDate').value;
        const bedTime = document.getElementById('bedTime').value;
        const wakeTime = document.getElementById('wakeTime').value;
        const notes = document.getElementById('sleepNotes').value;

        if (!date || !bedTime || !wakeTime) {
            alert('Please fill in all date and time fields.');
            return;
        }

        // Calculate sleep duration
        const bedDateTime = new Date(`${date}T${bedTime}`);
        let wakeDateTime = new Date(`${date}T${wakeTime}`);

        // If wake time is earlier than bed time, it's an overnight sleep
        if (wakeDateTime < bedDateTime) {
            wakeDateTime.setDate(wakeDateTime.getDate() + 1);
        }

        const durationMillis = wakeDateTime - bedDateTime;
        const hours = Math.floor(durationMillis / (1000 * 60 * 60));
        const minutes = Math.floor((durationMillis % (1000 * 60 * 60)) / (1000 * 60));
        const durationFormatted = `${hours}h ${minutes}m`;

        const newLog = {
            id: Date.now(),
            date,
            bedTime,
            wakeTime,
            notes,
            duration: durationFormatted
        };

        addLogToDOM(newLog);
        saveLog(newLog);

        sleepForm.reset();
        document.getElementById('sleepDate').value = new Date().toISOString().split('T')[0];
    });

    function addLogToDOM(log) {
        const emptyState = logList.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }
        
        const logItem = document.createElement('div');
        logItem.classList.add('log-item');
        logItem.setAttribute('data-id', log.id);

        logItem.innerHTML = `
            <div class="log-details">
                <strong>${new Date(log.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</strong>
                <p>Slept from ${formatTime(log.bedTime)} to ${formatTime(log.wakeTime)}.</p>
                ${log.notes ? `<p><em>Notes: ${log.notes}</em></p>` : ''}
            </div>
            <div class="log-duration">${log.duration}</div>
        `;
        logList.prepend(logItem);
    }

    function saveLog(log) {
        const logs = JSON.parse(localStorage.getItem('zenith-sleepLogs')) || [];
        logs.unshift(log);
        localStorage.setItem('zenith-sleepLogs', JSON.stringify(logs));
    }

    function loadLogs() {
        const logs = JSON.parse(localStorage.getItem('zenith-sleepLogs')) || [];
        if (logs.length === 0) {
            logList.innerHTML = '<p class="empty-state">No sleep has been logged yet.</p>';
        } else {
            logs.forEach(log => addLogToDOM(log));
        }
    }

    function formatTime(timeString) {
        const [hourString, minute] = timeString.split(":");
        const hour = +hourString % 24;
        return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
    }
});