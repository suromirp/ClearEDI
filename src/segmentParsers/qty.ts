export function renderQTY(
  segment: string,
  parts: string[],
  dict: any
): { html: string; quantity?: string } {
  const [code, value] = parts[0]?.split(':') ?? [];
  const codeExplanation = dict?.fields?.[code] ?? '⚠️ onbekend';

  return {
    html: `
        <h3>QTY – Aantal</h3>
        <code>${segment}</code>
        <p>🛈 <strong>${code}</strong> = ${codeExplanation}</p>
        ${value ? `<p>🛈 <strong>${value}</strong> = Aantal</p>` : ''}
      `,
    quantity: value,
  };
}
