export function renderLIN(
  segment: string,
  parts: string[]
): {
  html: string;
  product: {
    lineItemNumber: string;
    ean: string;
    quantity: string;
    price: string;
  };
} {
  const lineItemNumber = parts[0] ?? '';
  const actionRequestCode = parts[1] ?? '';
  const [itemNumber, itemCodeType] = parts[2]?.split(':') ?? [];

  return {
    html: `
      <h3>LIN – Line Item</h3>
      <code>${segment}</code>
      <p>🛈 Line Item Number: <strong>${lineItemNumber}</strong></p>
      <p>🛈 Action Code: <strong>${actionRequestCode}</strong></p>
      <p>🛈 Item Number: <strong>${itemNumber}</strong></p>
      <p>🛈 Numbering Type: <strong>${itemCodeType}</strong></p>
    `,
    product: {
      lineItemNumber,
      ean: itemNumber ?? '',
      quantity: '',
      price: '',
    },
  };
}
