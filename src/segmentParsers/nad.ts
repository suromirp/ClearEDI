export function renderNAD(segment: string, parts: string[]): string {
  const partyFunctionCode = parts[0] ?? '';
  const gln = parts[1] ?? '';
  const name = parts[2] ?? '';

  return `
    <h3>NAD – Name and address</h3>
    <code>${segment}</code>
    <p><strong>Function:</strong> ${partyFunctionCode}</p>
    <p><strong>GLN:</strong> ${gln}</p>
    <p><strong>Name:</strong> ${name}</p>
  `;
}
