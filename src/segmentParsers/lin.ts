export function renderLIN(segment: string, parts: string[]): { html: string; product: any } {
  const lineNumber = parts[0] ?? '';
  const ean = parts[2]?.split(':')[0] ?? '';

  return {
    html: `
      <h3>LIN – Line item</h3>
      <code>${segment}</code>
      <p><strong>Line number:</strong> ${lineNumber}</p>
      <p><strong>EAN:</strong> ${ean}</p>
    `,
    product: { lineNumber, ean },
  };
}
