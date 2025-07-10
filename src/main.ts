import './sass/main.scss';
import { createUI } from './ui/createUI';
import { render } from './render';

const { textarea, toggleCheckbox } = createUI();

textarea.addEventListener('input', render);
toggleCheckbox.addEventListener('change', render);

render();
