import { setElements } from './elementsUI';

export function createUI() {
  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Plak hier je EDI-bericht...';

  const toggleWrapper = document.createElement('label');
  toggleWrapper.className = 'toggle-unknowns';

  const toggleCheckbox = document.createElement('input');
  toggleCheckbox.type = 'checkbox';
  toggleCheckbox.checked = false;
  toggleWrapper.appendChild(toggleCheckbox);
  toggleWrapper.appendChild(document.createTextNode(' Toon onbekende segmenten en codes'));

  const buttonRow = document.createElement('div');
  buttonRow.className = 'button-row';

  const pasteButton = document.createElement('button');
  pasteButton.className = 'paste-button';
  pasteButton.textContent = 'Paste';
  pasteButton.type = 'button';

  const resetButton = document.createElement('button');
  resetButton.className = 'reset-button';
  resetButton.textContent = 'Reset';
  resetButton.type = 'button';

  const container = document.createElement('div');
  container.className = 'edi-output';
  
  pasteButton.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      textarea.value = text;
      container.innerHTML = ''; // eventueel leegmaken
  
      // Trigger input zodat het gelijk laad
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
  
    } catch (err) {
      alert('Klembordinhoud kan niet worden geplakt. Geef toestemming of gebruik een veilige browser.');
      console.error('Clipboard error:', err);
    }
  });  

  resetButton.addEventListener('click', () => {
    textarea.value = '';
    container.innerHTML = '';
  });

  buttonRow.appendChild(pasteButton);
  buttonRow.appendChild(resetButton);

  document.body.appendChild(toggleWrapper);
  document.body.appendChild(textarea);
  document.body.appendChild(buttonRow);
  document.body.appendChild(container);

  setElements(textarea, container, toggleCheckbox);

  return { textarea, toggleCheckbox };
}
