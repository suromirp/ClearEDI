import './sass/main.scss';
import { createUI } from './ui/createUI';
import { render } from './render';
import { initializeDarkMode, toggleTheme } from './darkMode';

const { textarea, toggleCheckbox, themeToggleButton } = createUI();

textarea.addEventListener('input', render);
toggleCheckbox.addEventListener('change', render);

render();

initializeDarkMode();

themeToggleButton.addEventListener('click', toggleTheme);
