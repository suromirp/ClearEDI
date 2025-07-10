let textarea: HTMLTextAreaElement;
let container: HTMLDivElement;
let toggleCheckbox: HTMLInputElement;
let errorCounterEl: HTMLDivElement;

export function setElements(
  t: HTMLTextAreaElement,
  c: HTMLDivElement,
  cb: HTMLInputElement,
  ec: HTMLDivElement
) {
  textarea = t;
  container = c;
  toggleCheckbox = cb;
  errorCounterEl = ec;
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

// Error counter element
export function getErrorCounterElement() {
  return errorCounterEl;
}
