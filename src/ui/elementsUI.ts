let textarea: HTMLTextAreaElement;
let container: HTMLDivElement;
let toggleCheckbox: HTMLInputElement;

export function setElements(
  t: HTMLTextAreaElement,
  c: HTMLDivElement,
  cb: HTMLInputElement
) {
  textarea = t;
  container = c;
  toggleCheckbox = cb;
}

export function getTextarea() {
  return textarea;
}

export function getContainer() {
  return container;
}

export function getToggle() {
  return toggleCheckbox;
}
