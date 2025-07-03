export function renderMOA(segment: string, parts: string[]): string {
    const amountQualifier = parts[0]?.split(':')[0] ?? '';
    const amount = parts[0]?.split(':')[1] ?? '';
  
    return `
      <h3>MOA – Monetary amount</h3>
      <code>${segment}</code>
      <p><strong>Qualifier:</strong> ${amountQualifier}</p>
      <p><strong>Amount:</strong> €${amount}</p>
    `;
  }
  