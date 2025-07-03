export function renderBGM(segment: string, parts: string[]): string {
  const documentCode = parts[0]?.split(':')[0] ?? '';
  const documentNumber = parts[1] ?? '';

  return `
    <h3>BGM – Beginning of Message</h3>
    <code>${segment}</code>
    <p><strong>Document code:</strong> ${documentCode}</p>
    <p><strong>Document number:</strong> ${documentNumber}</p>
  `;
}
