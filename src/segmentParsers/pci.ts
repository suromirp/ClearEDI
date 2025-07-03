export function renderPCI(segment: string, parts: string[]): string {
    const packagingIndicator = parts[0] ?? '';
  
    return `
      <h3>PCI – Package identification</h3>
      <code>${segment}</code>
      <p><strong>Verpakkingsindicator:</strong> ${packagingIndicator}</p>
    `;
  }
  