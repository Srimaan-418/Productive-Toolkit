// Theme Toggle
const toggleBtn = document.getElementById('themeToggle');
const body = document.body;

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

// Apply saved theme on load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
  }
  generateQuote();
});

// Quote Generator
const quotes = [
  "Discipline is the bridge between goals and accomplishment.",
  "Focus on being productive instead of busy.",
  "The way to get started is to quit talking and begin doing.",
  "Small steps every day lead to big results.",
  "Don't watch the clock; do what it does. Keep going.",
  "You don’t need to see the whole staircase, just take the first step.",
  "Your future is created by what you do today, not tomorrow.",
  "It always seems impossible until it's done."
];

const quoteText = document.getElementById('quoteText');
const newQuoteBtn = document.getElementById('newQuoteBtn');

function generateQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  quoteText.textContent = `"${quotes[random]}"`;
}

newQuoteBtn.addEventListener('click', generateQuote);
