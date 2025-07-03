export function renderCPS(segment: string, parts: string[]): string {
    const hierNr = parts[0] ?? '';
    const parentNr = parts[1] ?? '';
  
    return `
      <h3>CPS – Packing sequence</h3>
      <code>${segment}</code>
      <p><strong>Hiërarchie nummer:</strong> ${hierNr}</p>
      <p><strong>Parent hiërarchie nummer:</strong> ${parentNr || '—'}</p>
    `;
  }
  