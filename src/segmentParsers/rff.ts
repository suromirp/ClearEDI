export function renderRFF(segment: string, parts: string[]): string {
  const ref = parts[0]?.split(':') ?? [];
  const refCode = ref[0] ?? '';
  const refValue = ref[1] ?? '';

  return `
    <h3>RFF – Reference</h3>
    <code>${segment}</code>
    <p><strong>Code:</strong> ${refCode}</p>
    <p><strong>Value:</strong> ${refValue}</p>
  `;
}
