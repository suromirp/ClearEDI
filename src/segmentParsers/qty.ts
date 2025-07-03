export function renderQTY(segment: string, parts: string[], dict: any): { html: string; quantity: string } {
  const qtyInfo = parts[0]?.split(':') ?? [];
  const qtyCode = qtyInfo[0] ?? '';
  const qtyValue = qtyInfo[1] ?? '';

  return {
    html: `
      <h3>QTY – Quantity</h3>
      <code>${segment}</code>
      <p><strong>Code:</strong> ${qtyCode}</p>
      <p><strong>Quantity:</strong> ${qtyValue}</p>
    `,
    quantity: qtyValue,
  };
}
