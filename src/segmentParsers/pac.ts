export function renderPAC(segment: string, parts: string[]): string {
    const numberOfPackages = parts[0] ?? '';
    const packagingType = parts[1]?.split(':')[0] ?? '';
  
    return `
      <h3>PAC – Package</h3>
      <code>${segment}</code>
      <p><strong>Aantal verpakkingen:</strong> ${numberOfPackages}</p>
      <p><strong>Verpakkingsvorm:</strong> ${packagingType}</p>
    `;
  }
  