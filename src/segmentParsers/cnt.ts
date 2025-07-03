export function renderCNT(segment: string, parts: string[]): string {
    const [cntQualifier, count] = parts[0]?.split(':') ?? [];
  
    return `
      <h3>CNT – Control total</h3>
      <code>${segment}</code>
      <p><strong>Soort telling:</strong> ${cntQualifier}</p>
      <p><strong>Aantal:</strong> ${count}</p>
    `;
  }
  