export function renderRFF(segment: string, parts: string[], dict: any): string {
    const [qualifier, value] = parts[0]?.split(':') ?? [];
    const uitleg = dict?.fields?.[qualifier] ?? '⚠️ onbekend';
  
    return `
      <h3>RFF – Referentie</h3>
      <code>${segment}</code>
      <p>🛈 <strong>${qualifier}</strong> = ${uitleg}</p>
      ${value ? `<p>🛈 <strong>${value}</strong></p>` : ''}
    `;
  }
  