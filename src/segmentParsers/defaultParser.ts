// src/parseDefault.ts
import { ediDictionary } from '../ediDictionary';

export function parseDefault(segment: string, _parts: string[], container: HTMLElement) {
  const tag = segment.split('+')[0];
  const name = ediDictionary[tag as keyof typeof ediDictionary]?.name;
  const el = document.createElement('div');
  el.className = 'segment';
  el.innerHTML = `
    <h3>⚠️ ${name ? `${tag} – ${name}` : `Unknown segment (${tag})`}</h3>
    <code>${segment}</code>
    <p>${name 
      ? 'No renderer implemented yet, but the segment name is known' 
      : 'This segment is not recognized or supported yet.'
    }</p>
  `;
  container.appendChild(el);
}
