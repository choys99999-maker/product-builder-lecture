const generateBtn = document.getElementById('generate-btn');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const themeLabel = themeToggle.querySelector('.theme-label');
const numberSpans = document.querySelectorAll('.number');
const themeStorageKey = 'lotto-theme';

function getInitialTheme() {
    const savedTheme = localStorage.getItem(themeStorageKey);

    if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    const isDark = theme === 'dark';

    document.body.classList.toggle('dark-mode', isDark);
    themeIcon.textContent = isDark ? '☀' : '☾';
    themeLabel.textContent = isDark ? '화이트모드' : '다크모드';
    themeToggle.setAttribute('aria-label', isDark ? '화이트모드로 변경' : '다크모드로 변경');
    themeToggle.setAttribute('aria-pressed', String(isDark));
    localStorage.setItem(themeStorageKey, theme);
}

function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    numberSpans.forEach((span, index) => {
        span.textContent = sortedNumbers[index];
    });
}

themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    applyTheme(nextTheme);
});

generateBtn.addEventListener('click', generateNumbers);

applyTheme(getInitialTheme());

// Generate numbers on initial load
generateNumbers();
