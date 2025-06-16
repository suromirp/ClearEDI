export function parseDefault(segment: string, parts: string[], container: HTMLElement) {
    const el = document.createElement('div');
    el.className = 'segment';
    el.innerHTML = `
      <h3>⚠️ Onbekend segment (${segment.split('+')[0]})</h3>
      <code>${segment}</code>
      <p>Dit segment wordt nog niet herkend of ondersteund.</p>
    `;
    container.appendChild(el);
  }  