export function renderUNS(segment: string, parts: string[]): string {
    const sectionIdentification = parts[0] ?? '';
  
    return `
      <h3>UNS – Section control</h3>
      <code>${segment}</code>
      <p>🛈 Section identification: <strong>${sectionIdentification}</strong></p>
      <p>🛈 Indicates a new section within the message, e.g. detail section (S)</p>
    `;
}