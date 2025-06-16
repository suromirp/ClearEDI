export function renderNAD(segment: string, parts: string[], dict: any): string {
    const rol = parts[0];
    const partijId = parts[1]?.split(':')[0] ?? '';
    const naam = parts[2]?.trim();
    const straat = parts[3]?.trim();
    const plaats = parts[4]?.trim();
    const postcode = parts[5]?.trim();
    const land = parts[6]?.trim();
    const rolUitleg = dict?.fields?.[rol] ?? 'Onbekende partij';
  
    return `
      <h3>NAD – ${rolUitleg}</h3>
      <code>${segment}</code>
      <p>🛈 Rolcode: <strong>${rol}</strong> (${rolUitleg})</p>
      ${partijId ? `<p>🛈 Partij ID: <strong>${partijId}</strong></p>` : ''}
      ${naam ? `<p>🛈 Naam: <strong>${naam}</strong></p>` : ''}
      ${straat ? `<p>🛈 Adres: <strong>${straat}</strong></p>` : ''}
      ${(postcode || plaats) ? `<p>🛈 Postcode & Plaats: <strong>${[postcode, plaats].filter(Boolean).join(' ')}</strong></p>` : ''}
      ${land ? `<p>🛈 Land: <strong>${land}</strong></p>` : ''}
    `;
  }
  