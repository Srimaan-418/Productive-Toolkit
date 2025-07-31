// nav.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggler Logic ---
    const themeToggle = document.getElementById('themeToggle');
    
    // Function to apply the saved theme
    const applyTheme = () => {
        const savedTheme = localStorage.getItem('zenith-theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);
        if (themeToggle) {
            themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
        }
    };

    // Function to toggle and save the theme
    const toggleTheme = () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('zenith-theme', newTheme);
        applyTheme();
    };

    // Add event listener to the button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Apply theme on initial load
    applyTheme();


    // --- Current Time Display Logic ---
    const currentTimeDisplay = document.getElementById('currentTime');

    const updateTime = () => {
        if (currentTimeDisplay) {
            const now = new Date();
            const options = { hour: '2-digit', minute: '2-digit', hour12: true };
            currentTimeDisplay.textContent = now.toLocaleTimeString('en-US', options);
        }
    };

    // Update time immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);
});