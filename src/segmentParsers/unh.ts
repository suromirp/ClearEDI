export function renderUNH(segment: string, parts: string[]): string {
  const messageRef = parts[0] ?? '';
  const messageType = parts[1]?.split(':')[0] ?? '';
  const version = parts[1]?.split(':')[1] ?? '';
  const release = parts[1]?.split(':')[2] ?? '';
  const agency = parts[1]?.split(':')[3] ?? '';

  return `
    <h3>UNH – Message header</h3>
    <code>${segment}</code>
    <p><strong>Message reference:</strong> ${messageRef}</p>
    <p><strong>Type:</strong> ${messageType}, Version: ${version}, Release: ${release}, Agency: ${agency}</p>
  `;
}
