export function renderUNZ(segment: string, parts: string[]): string {
    const messageCount = parts[0] ?? '';
    const controlRef = parts[1] ?? '';
  
    return `
      <h3>UNZ – Interchange trailer</h3>
      <code>${segment}</code>
      <p>🛈 Number of messages: <strong>${messageCount}</strong></p>
      <p>🛈 Interchange control reference: <strong>${controlRef}</strong></p>
    `;
}
  