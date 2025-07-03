export function renderCUX(segment: string, parts: string[]): string {
    const currencyQualifier = parts[0] ?? '';
    const currencyCode = parts[1]?.split(':')[0] ?? '';
    const currencyType = parts[1]?.split(':')[1] ?? '';
  
    return `
      <h3>CUX – Currencies</h3>
      <code>${segment}</code>
      <p><strong>Valutakwalificatie:</strong> ${currencyQualifier}</p>
      <p><strong>Valutacode:</strong> ${currencyCode}</p>
      <p><strong>Type:</strong> ${currencyType}</p>
    `;
  }
  