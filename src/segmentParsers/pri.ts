export function renderPRI(segment: string, parts: string[]): { html: string, price: string } {
  const priceData = parts[0]?.split(':') ?? [];
  const priceType = priceData[0] ?? '';
  const priceAmount = priceData[1] ?? '';

  return {
    html: `
      <h3>PRI – Price details</h3>
      <code>${segment}</code>
      <p>🛈 Price type: <strong>${priceType}</strong></p>
      <p>🛈 Price amount: <strong>${priceAmount}</strong></p>
    `,
    price: priceAmount,
  };
}