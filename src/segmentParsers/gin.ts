export function renderGIN(segment: string, parts: string[]): string {
    const [identityType, identityCode] = parts[0]?.split(':') ?? [];
  
    return `
      <h3>GIN – Goods identity number</h3>
      <code>${segment}</code>
      <p><strong>Identificatietype:</strong> ${identityType}</p>
      <p><strong>Identificatiecode:</strong> ${identityCode}</p>
    `;
  }
  