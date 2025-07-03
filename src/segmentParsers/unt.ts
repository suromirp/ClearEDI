export function renderUNT(segment: string, parts: string[]): string {
    const segmentCount = parts[0] ?? '';
    const messageRefNumber = parts[1] ?? '';
  
    return `
      <h3>UNT – Message trailer</h3>
      <code>${segment}</code>
      <p>🛈 Number of segments in the message: <strong>${segmentCount}</strong></p>
      <p>🛈 Message reference number: <strong>${messageRefNumber}</strong></p>
    `;
  }
  