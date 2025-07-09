// src/darkMode.ts

/**
 * Initialiseert dark mode op basis van system preference
 */
export function initializeDarkMode() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme as 'dark' | 'light');
  } else {
    setTheme(prefersDark ? 'dark' : 'light');
  }
}

/**
 * Zet het thema naar dark of light
 */
export function setTheme(theme: 'dark' | 'light') {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

/**
 * Toggle tussen dark en light mode
 */
export function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme as 'dark' | 'light');
}
